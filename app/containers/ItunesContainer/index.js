import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Skeleton, Input } from 'antd';
import {
  Container, CustomTitle, CustomCard, CustomItemCard,
  Meta, MetaTitle, MetaDescription
} from './styles'
import T from '@components/T';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectArtistName, selectMusic, selectError } from './selectors'
import { itunesContainerCreators } from './reducer'
import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';

const { Search } = Input;
const ItunesContainer = ({
  artistName,
  music = {},
  error,
  dispatchGetItunes,
  dispatchClearItunes,
  intl,
  maxWidth,
  padding
}) => {
  useInjectSaga({ key: 'itunesContainer', saga });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(music, 'results', null);
    if (loading && loaded) {
      setLoading(false);
    }
  }, [music])

  const handleOnChange = (value) => {
    if (!isEmpty(value)) {
      dispatchGetItunes(value);
      setLoading(true);
    } else {
      dispatchClearItunes()
    }
  }

  const debouceHandleOnChange = debounce(handleOnChange, 200);

  const results = get(music, 'results', []);
  const resultCount = get(music, 'resultCount', 0);

  const renderErrorState = () => {
    let localerror;
    if (error) {
      localerror = error;
    } else if (!get(music, 'resultCount', 0)) {
      localerror = 'search_music_default';
    }
    console.log(localerror);
    return (
      !loading &&
      localerror && (
        <CustomCard color={error ? 'red' : 'grey'} title={intl.formatMessage({ id: 'search_music' })}>
          <T id={localerror} />
        </CustomCard>
      )
    );
  };

  return (
    <Container maxWidth={maxWidth} padding={padding}>
      <CustomTitle>Itunes</CustomTitle>
      <Search placeholder="search artist"
        allowClear
        enterButton
        size="large"
        style={{ width: 300 }}
        onChange={(e) => debouceHandleOnChange(e.target.value)} />


      {results && (results.length !== 0 || loading) &&
        <CustomCard>
          <Skeleton loading={loading} active>
            <MetaTitle strong>{resultCount} Results Found.</MetaTitle>
            {results.map((item, index) =>
              <CustomItemCard bodyStyle={{ padding: 10 }}
                style={{ height: 60 }}
                hoverable
                key={index}
                cover={<img
                  alt="example"
                  src={item.artworkUrl60}
                  width="60px"
                  height="60px"
                  style={{ minWidth: 60 }}
                />}>
                <Meta>
                  <MetaTitle>{item.trackName}</MetaTitle>
                  <MetaDescription type="secondary">{item.artistName}</MetaDescription>
                </Meta>
              </CustomItemCard>
            )}
          </Skeleton>
        </CustomCard>
      }
      {renderErrorState()}

    </Container>
  )
}

ItunesContainer.propTypes = {
  artistName: PropTypes.string,
  music: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  error: PropTypes.string,
  dispatchGetItunes: PropTypes.func,
  dispatchClearItunes: PropTypes.func,
  intl: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

ItunesContainer.defaultProps = {
  maxWidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  artistName: selectArtistName(),
  music: selectMusic(),
  error: selectError()
})

const mapDispatchToProps = (dispatch) => {
  const { requestGetItunes, clearItunes } = itunesContainerCreators;
  return {
    dispatchGetItunes: (artistName) => dispatch(requestGetItunes(artistName)),
    dispatchClearItunes: () => dispatch(clearItunes())
  }
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  injectIntl,
  withConnect,
  memo
)(ItunesContainer);

export const ItunesContainerTest = compose(injectIntl)(ItunesContainer);
