/**
 *
 * Tests for ItunesContainer
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { ItunesContainerTest as ItunesContainer } from '../index';

describe('<ItunesContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ItunesContainer dispatchGetItunes={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearItunes on empty change', async () => {
    const getItunesSpy = jest.fn();
    const clearItunesSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <ItunesContainer dispatchClearItunes={clearItunesSpy} dispatchGetItunes={getItunesSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getItunesSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearItunesSpy).toBeCalled();
  });

  it('should call dispatchGetItunes on change', async () => {
    const { getByTestId } = renderProvider(<ItunesContainer dispatchGetItunes={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some artist' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
