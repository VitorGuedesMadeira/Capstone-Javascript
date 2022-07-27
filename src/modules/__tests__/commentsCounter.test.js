import getCommentsMock from '../__mocks__/getCommentsFetchMock';

test('Should return number of comments for single pokemon', () => {
  const displayComments = () => {
    getCommentsMock().then((dataArr) => {
      expect(dataArr.length).toBe(1);
    });
  };
  displayComments();
});
