import { generateApiClient } from '@utils/apiUtils';

const itunesApi = generateApiClient('itunes');

export const getItunesMusic = artistName => itunesApi.get(`/search?term=${artistName}&entity=song`);
