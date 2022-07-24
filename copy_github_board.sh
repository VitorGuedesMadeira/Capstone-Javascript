GITHUB_AUTH_TOKEN=$1

SOURCE_GITHUB_USERNAME=$2
SOURCE_REPO_NAME=$3

TARGET_GITHUB_USERNAME=$4
TARGET_REPO_NAME=$5


source_project_id=( $(curl \
  -H "Authorization: token ${GITHUB_AUTH_TOKEN}" \
  -H "Accept: application/vnd.github.inertia-preview+json" \
  https://api.github.com/repos/${SOURCE_GITHUB_USERNAME}/${SOURCE_REPO_NAME}/projects | jq .[0].id) )

target_project_id=( $(curl \
  -H "Authorization: token ${GITHUB_AUTH_TOKEN}" \
  -H "Accept: application/vnd.github.inertia-preview+json" \
  https://api.github.com/repos/${TARGET_GITHUB_USERNAME}/${TARGET_REPO_NAME}/projects | jq .[0].id) )

echo "source_project_id: ${source_project_id}"

sourceColumnIds=( $(curl \
  -H "Authorization: token ${GITHUB_AUTH_TOKEN}" \
  -H "Accept: application/vnd.github.inertia-preview+json" \
  https://api.github.com/projects/${source_project_id}/columns | jq .[].id) )

targetColumnIds=( $(curl \
  -H "Authorization: token ${GITHUB_AUTH_TOKEN}" \
  -H "Accept: application/vnd.github.inertia-preview+json" \
  https://api.github.com/projects/${target_project_id}/columns | jq .[].id) )


if [ "${#videos[@]}" -ne "${#subtitles[@]}" ]; then
    echo "Different number of columns in between projects"
    exit -1
fi

for sourceColumnIndex in "${!sourceColumnIds[@]}"
do
    sourceColumnId=${sourceColumnIds[$sourceColumnIndex]}
    sourceColumnId=${sourceColumnId//[^a-zA-Z0-9_]/}
    targetColumnId=${targetColumnIds[$sourceColumnIndex]}
    targetColumnId=${targetColumnId//[^a-zA-Z0-9_]/}
    curl \
      -H "Authorization: token ${GITHUB_AUTH_TOKEN}" \
      -H "Accept: application/vnd.github.inertia-preview+json" \
      https://api.github.com/projects/columns/${sourceColumnId}/cards \
      | jq reverse \
      | jq -c '.[]' \
      | while read card; do

      
        # find issue linked into a card        
        source_issue_url=$(jq '.content_url' <<< "$card")
        test="api.github.com/repos/microverseinc/curriculum-javascript/issues/4"
        prefix="\"https://"
        suffix="\""
        source_issue_url=${source_issue_url/#$prefix}
        source_issue_url=${source_issue_url/%$suffix}

        title="$(curl \
          -H "Authorization: token ${GITHUB_AUTH_TOKEN}" \
          -H "Accept: application/vnd.github.v3+json" \
          "https://${source_issue_url}" | jq .title)"

        body="$(curl \
          -H "Authorization: token ${GITHUB_AUTH_TOKEN}" \
          -H "Accept: application/vnd.github.v3+json" \
          "https://${source_issue_url}" | jq .body)"

        # create a duplicate of the issue

        issue_data='{"title":'${title}',"body":'${body}'}'

        created_issue_id=( $(curl \
          -X POST \
          -H "Authorization: token ${GITHUB_AUTH_TOKEN}" \
          -H "Accept: application/vnd.github.v3+json" \
          -d "${issue_data}" \
          https://api.github.com/repos/${TARGET_GITHUB_USERNAME}/${TARGET_REPO_NAME}/issues | jq .id))

        # create a duplicate of the card with a link to a newly created issue

        card_data='{"content_id":'${created_issue_id}',"content_type":"Issue"}'

        curl \
          -w 'HTTP Status: %{http_code}' --silent --output /dev/null \
          -X POST \
          -H "Authorization: token ${GITHUB_AUTH_TOKEN}" \
          -H "Accept: application/vnd.github.inertia-preview+json" \
          -d "${card_data}" \
          https://api.github.com/projects/columns/${targetColumnId}/cards

    done
done

      
