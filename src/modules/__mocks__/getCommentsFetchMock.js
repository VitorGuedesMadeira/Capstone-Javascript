const getCommentsMock = () => {
  return Promise.resolve([{
    comment: "This is nice!",
    creation_date: "2021-01-10",
    username: "John"
}])
}

export default getCommentsMock;