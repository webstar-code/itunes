import { itunesContainerTypes, itunesContainerCreators } from '../reducer';

describe('ItunesContainer action tests', () => {
  it('has a type of REQUEST_GET_ITUNES', () => {
    const expected = {
      type: itunesContainerTypes.REQUEST_GET_ITUNES,
      artistName: 'jack'
    };
    expect(itunesContainerCreators.requestGetItunes('jack')).toEqual(expected);
  });
});
