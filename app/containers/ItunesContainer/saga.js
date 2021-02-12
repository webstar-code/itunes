import { put, call, takeLatest, all } from 'redux-saga/effects';
import { getItunesSongs, getItunesMusicVideo } from '@services/itunesApi';
import { itunesContainerTypes, itunesContainerCreators } from './reducer';

const { REQUEST_GET_ITUNES } = itunesContainerTypes;
const { successGetSongs, failureGetSongs,
  successGetmusicVideo, failureGetmusicVideo,  } = itunesContainerCreators;

export function* GetSongs(action) {
  const response = yield call(getItunesSongs, action.artistName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetSongs(data));
  } else {
    yield put(failureGetSongs(data));
  }
}

export function* GetMusicVideo(action) {
  const response = yield call(getItunesMusicVideo, action.artistName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetmusicVideo(data));
  } else {
    yield put(failureGetmusicVideo(data));
  }
}

export function* watchSongs() {
  yield takeLatest(REQUEST_GET_ITUNES, GetSongs);
}

export function* watchmusicVideo() {
  yield takeLatest(REQUEST_GET_ITUNES, GetMusicVideo);
}


// Individual exports for testing
export default function* itunesContainerSaga() {
  yield all([
    watchSongs(),
    watchmusicVideo()
  ])
}


