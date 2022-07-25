const getLikes = async (pokeName, element) => {
    const likes = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
    ).then((data) => {
        data.json()}
    ).then((likes) => {
        likes.forEach(eachLike => {
            if(eachLike.item_id === pokeName) {
                item.innerHTML = `${eachLike.likes}`;
            }
        });
    })
};

export default getLikes;
