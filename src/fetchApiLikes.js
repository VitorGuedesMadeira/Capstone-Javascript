const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ewWKj7zRfM05pRAULVITORYQRcA4r/likes/';

const postLikes = async (item1) => {
  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      item_id: item1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return result.text();
};

export default postLikes;
