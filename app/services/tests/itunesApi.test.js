import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getItunesSongs, getItunesMusicVideo } from '../itunesApi';

describe('Itunes Api test', () => {
  const artistName = 'justin';
  it('should make the api call to "/search?term={}&entity=songs"', async () => {
    const mock = new MockAdapter(getApiClient('itunes').axiosInstance);
    const data = [
      {
        resultCount: 1,
        results: [{ artistName }]
      }
    ];
    mock.onGet(`/search?term=${artistName}&entity=song`).reply(200, data);
    const res = await getItunesSongs(artistName);
    expect(res.data).toEqual(data);
  });

  it('should make the api call to "/search?term={}&entity=musicVideo"', async () => {
    const mock = new MockAdapter(getApiClient('itunes').axiosInstance);
    const data = [
      {
        resultCount: 1,
        results: [{ artistName }]
      }
    ];
    mock.onGet(`/search?term=${artistName}&entity=musicVideo`).reply(200, data);
    const res = await getItunesMusicVideo(artistName);
    expect(res.data).toEqual(data);
  });
});
