import { generateApiClient } from '@utils/apiUtils';

const itunesApi = generateApiClient('itunes');

export const getItunesSongs = artistName => itunesApi.get(`/search?term=${artistName}&entity=song`);

export const getItunesMusicVideo = artistName => itunesApi.get(`/search?term=${artistName}&entity=musicVideo`);
