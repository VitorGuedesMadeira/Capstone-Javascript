const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/rmtBPEBrkoV0tXGWEWRY/likes/';

const fetchLikes = (pokemon, item) => fetch(url)
  .then((response) => response.json())
  .then((likes) => {
    likes.forEach((pkLike) => {
      if (pkLike.item_id === pokemon.name) {
        item.textContent = pkLike.likes;
      }
    });
  });

export default fetchLikes;
