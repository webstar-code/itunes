import { put, call, takeLatest } from 'redux-saga/effects';
import { getItunesMusic } from '@services/itunesApi';
import { itunesContainerTypes, itunesContainerCreators } from './reducer';

const { REQUEST_GET_ITUNES } = itunesContainerTypes;
const { successGetItunes, failureGetItunes } = itunesContainerCreators;

export function* getItunes(action) {
  const response = yield call(getItunesMusic, action.artistName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetItunes(data));
  } else {
    yield put(failureGetItunes(data));
  }
}


// Individual exports for testing
export default function* itunesContainerSaga() {
  yield takeLatest(REQUEST_GET_ITUNES, getItunes);
}
