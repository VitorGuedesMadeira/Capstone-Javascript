const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/rmtBPEBrkoV0tXGWEWRY/likes/';

const postLikes = async (item) => {
  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      item_id: item,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return result.text();
};

export default postLikes;