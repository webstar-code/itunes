import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const initialState = { artistName: null, songs: [], musicVideo: [], error: null};

export const { Types: itunesContainerTypes, Creators: itunesContainerCreators } = createActions({
  requestGetItunes: ['artistName'],
  successGetSongs: ['songs'],
  failureGetSongs: ['error'],
  successGetmusicVideo: ['musicVideo'],
  failureGetmusicVideo: ['error'],
  clearItunes: []
});

export const itunesContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case itunesContainerTypes.REQUEST_GET_ITUNES:
        draft.artistName = action.artistName;
        break;
      case itunesContainerTypes.SUCCESS_GET_SONGS:
        draft.songs = action.songs;
        break;
      case itunesContainerTypes.FAILURE_GET_SONGS:
        draft.error = get(action.error, 'message', 'something_went_wrong');
        break;
      case itunesContainerTypes.SUCCESS_GETMUSIC_VIDEO:
        draft.musicVideo = action.musicVideo;
        break;
      case itunesContainerTypes.FAILURE_GETMUSIC_VIDEO:
        draft.error = get(action.error, 'message', 'something_went_wrong');
        break;
      case itunesContainerTypes.CLEAR_ITUNES:
        return initialState;
    }
  });

export default itunesContainerReducer;
