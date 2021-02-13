import { selectItunesContainer, selectArtistName, selectSongs, selectmusicVideo, selectError } from '../selectors';

describe('ItunesContainer selector tests', () => {
  let mockedState;
  let artistName;
  let songs;
  let musicVideo;
  let error;

  beforeEach(() => {
    artistName = 'justin';
    songs = { resultCount: 1, results: [{ artistName }] };
    musicVideo = { resultCount: 1, results: [{ artistName }] };
    error = 'There was some error while fetching the repository details';

    mockedState = {
      itunesContainer: {
        artistName,
        songs,
        musicVideo,
        error
      }
    };
  });
  it('should select the itunesContainer state', () => {
    const ItunesContainerSelector = selectItunesContainer();
    expect(ItunesContainerSelector(mockedState)).toEqual(mockedState.itunesContainer);
  });
  it('should select the artistName', () => {
    const artistNameSelector = selectArtistName();
    expect(artistNameSelector(mockedState)).toEqual(artistName);
  });

  it('should select songs', () => {
    const songsSelector = selectSongs();
    expect(songsSelector(mockedState)).toEqual(songs);
  });

  it('should select musicVideo', () => {
    const musicVideoSelector = selectmusicVideo();
    expect(musicVideoSelector(mockedState)).toEqual(musicVideo);
  });

  it('should select the error', () => {
    const errorSelector = selectError();
    expect(errorSelector(mockedState)).toEqual(error);
  });
});
