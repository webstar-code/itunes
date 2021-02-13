/**
 * Test ItunesContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getItunesMusicVideo, getItunesSongs } from '@services/itunesApi';
import { apiResponseGenerator } from '@utils/testUtils';
import { GetSongs, GetMusicVideo, watchSongs, watchmusicVideo } from '../saga';
import { itunesContainerTypes } from '../reducer';

describe('ItunesContainer saga tests', () => {
  const songsGenerator = watchSongs();
  const musicVideoGenerator = watchmusicVideo();
  const artistName = 'justin';
  let getSongsGenerator = GetSongs({ artistName });
  let getmusicVideoGenerator = GetMusicVideo({ artistName });

  it('should start task to watch for REQUEST_GET_SONGS action', () => {
    expect(songsGenerator.next().value).toEqual(takeLatest(itunesContainerTypes.REQUEST_GET_ITUNES, GetSongs));
  });

  it('should start task to watch for REQUEST_GET_MUSICVIDEOS action', () => {
    expect(musicVideoGenerator.next().value).toEqual(
      takeLatest(itunesContainerTypes.REQUEST_GET_ITUNES, GetMusicVideo)
    );
  });

  it('should ensure that the action FAILURE_GET_SONGS is dispatched when the api call fails', () => {
    const res = getSongsGenerator.next().value;
    expect(res).toEqual(call(getItunesSongs, artistName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching songs.'
    };
    expect(getSongsGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: itunesContainerTypes.FAILURE_GET_SONGS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_GITHUB_REPOS is dispatched when the api call succeeds', () => {
    getSongsGenerator = GetSongs({ artistName });
    const res = getSongsGenerator.next().value;
    expect(res).toEqual(call(getItunesSongs, artistName));
    const songsResponse = {
      resultCount: 1,
      results: [{ trackName: 'Living Life' }]
    };
    expect(getSongsGenerator.next(apiResponseGenerator(true, songsResponse)).value).toEqual(
      put({
        type: itunesContainerTypes.SUCCESS_GET_SONGS,
        songs: songsResponse
      })
    );
  });

  it('should ensure that the action FAILURE_GETMUSIC_VIDEOS is dispatched when the api call fails', () => {
    const res = getmusicVideoGenerator.next().value;
    expect(res).toEqual(call(getItunesMusicVideo, artistName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching music Videos.'
    };
    expect(getmusicVideoGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: itunesContainerTypes.FAILURE_GETMUSIC_VIDEO,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GETMUSIC_VIDEOS is dispatched when the api call succeeds', () => {
    getmusicVideoGenerator = GetMusicVideo({ artistName });
    const res = getmusicVideoGenerator.next().value;
    expect(res).toEqual(call(getItunesMusicVideo, artistName));
    const musicVideoResponse = {
      resultCount: 1,
      results: [{ trackName: 'Living Life' }]
    };
    expect(getmusicVideoGenerator.next(apiResponseGenerator(true, musicVideoResponse)).value).toEqual(
      put({
        type: itunesContainerTypes.SUCCESS_GETMUSIC_VIDEO,
        musicVideo: musicVideoResponse
      })
    );
  });
});
