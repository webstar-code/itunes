import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

const itunesContainerDomain = state => state.itunesContainer || initialState;

export const selectArtistName = () =>
  createSelector(
    itunesContainerDomain,
    state => get(state, 'artistName', null)
  );

export const selectSongs = () =>
  createSelector(
    itunesContainerDomain,
    state => get(state, 'songs', null)
  );

export const selectmusicVideo = () =>
  createSelector(
    itunesContainerDomain,
    state => get(state, 'musicVideo', null)
  );

export const selectError = () =>
  createSelector(
    itunesContainerDomain,
    state => get(state, 'error', null)
  );
