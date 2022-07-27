const involvementURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/rmtBPEBrkoV0tXGWEWRY/comments';

const postComments = (name, commented, pokemon) => fetch(involvementURL, {
  method: 'POST',
  body: JSON.stringify({
    item_id: pokemon,
    username: name,
    comment: commented,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
});
export default postComments;