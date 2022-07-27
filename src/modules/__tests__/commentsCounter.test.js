import getCommentsMock from "../__mocks__/getCommentsFetchMock";

test('Should return number of comments for single pokemon', () => {
        let commentsTitle = ''
        const displayComments = () => {
            getCommentsMock().then(dataArr => {
              if (dataArr.length < 1 || dataArr.length === undefined) {
                commentsTitle = 'Comments(0)';
              } else {
                commentsTitle = `Comments (${dataArr.length})`;
              }
              expect(dataArr.length).toBe(1);
            }
            
        )}
        displayComments()
    })
