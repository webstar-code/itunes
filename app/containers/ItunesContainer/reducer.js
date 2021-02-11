import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const initialState = { artistName: null, music: [], error: null };

export const { Types: itunesContainerTypes, Creators: itunesContainerCreators } = createActions({
  requestGetItunes: ['artistName'],
  successGetItunes: ['music'],
  failureGetItunes: ['error'],
  clearItunes: []
});

export const itunesContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case itunesContainerTypes.REQUEST_GET_ITUNES:
        draft.artistName = action.artistName;
        break;
      case itunesContainerTypes.SUCCESS_GET_ITUNES:
        draft.music = action.music;
        break;
      case itunesContainerTypes.FAILURE_GET_ITUNES:
        draft.error = get(action.error, 'message', 'something_went_wrong');

        break;
      case itunesContainerTypes.CLEAR_ITUNES:
        return initialState;
    }
  });

export default itunesContainerReducer;
