const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';

const createId = async () => {
  const novoId = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.text());
  console.log(novoId);
  return novoId;
};

export default createId;