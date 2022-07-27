const fetchApiMock = () => {
    return Promise.resolve({results: [Math.floor(Math.random()*10),Math.floor(Math.random()*10),Math.floor(Math.random()*10)]})
  };

export default fetchApiMock;
