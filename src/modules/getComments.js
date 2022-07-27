const involvementURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/rmtBPEBrkoV0tXGWEWRY/comments';

const getComments = (itemID) => fetch(`${involvementURL}?item_id=${itemID}`)
  .then((response) => response.json());

export default getComments;