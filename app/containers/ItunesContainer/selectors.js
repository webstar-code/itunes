import { createSelector } from 'reselect';
import { initialState } from './reducer';

const itunesContainerDomain = state => state.itunesContainer || initialState;

export const selectArtistName = () =>
  createSelector(
    itunesContainerDomain,
    state => state.artistName
  );

export const selectMusic = () =>
  createSelector(
    itunesContainerDomain,
    state => state.music
  );

export const selectError = () =>
  createSelector(
    itunesContainerDomain,
    state => state.error
  );
