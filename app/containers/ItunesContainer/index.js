import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Skeleton, Input, Card } from 'antd';
import { Container, CustomTitle, CustomCard } from './styles';
import T from '@components/T';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectArtistName, selectSongs, selectmusicVideo, selectError } from './selectors';
import { itunesContainerCreators } from './reducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';

import Songs from './songs'
import MusicVideo from './musicVideo'

const { Search } = Input;
const ItunesContainer = ({
  artistName,
  songs = {},
  musicVideo = {},
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
    const loaded = get(songs, 'results', null);
    if (loading && loaded) {
      setLoading(false);
    }
  }, [songs]);
  console.log(songs);
  console.log(musicVideo);

  const handleOnChange = value => {
    if (!isEmpty(value)) {
      dispatchGetItunes(value);
      setLoading(true);
    } else {
      dispatchClearItunes();
    }
  };

  const debouceHandleOnChange = debounce(handleOnChange, 200);

  const results = get(songs, 'results', []);
  const resultCount = get(songs, 'resultCount', 0);

  const renderErrorState = () => {
    let localerror;
    if (error) {
      localerror = error;
    } else if (!get(songs, 'resultCount', 0)) {
      localerror = 'search_music_default';
    }
    return (
      !loading &&
      localerror && (
        <CustomCard color={error ? 'red' : 'grey'} title={intl.formatMessage({ id: 'search_music' })}>
          <T id={localerror} />
        </CustomCard>
      )
    );
  };


  const tabList = [
    {
      key: 'songs',
      tab: 'songs'
    },
    {
      key: 'musicVideo',
      tab: 'videos'
    },
  ]
  const [currtab, setCurrtab] = useState({ key: 'songs', tab: 'songs' })

  const onTabChange = (key, type) => {
    console.log(key, type);
    setCurrtab({ [type]: key });
  };
  const contentListNoTitle = {
    songs: <Songs loading={loading} />,
    musicVideo: <MusicVideo loading={loading} />,
  };


  return (
    <Container maxWidth={maxWidth} padding={padding}>
      <CustomTitle>Itunes</CustomTitle>
      <Search
        placeholder="search artist"
        allowClear
        enterButton
        size="large"
        style={{ width: 300 }}
        onChange={e => debouceHandleOnChange(e.target.value)}
      />
      <Card
        style={{ width: '100%', margin: 20}}
        tabList={tabList}
        activeTabKey={currtab.tab}
        onTabChange={key => {
          onTabChange(key, 'tab');
        }}
      >
        {contentListNoTitle[currtab.tab]}
      </Card>
      {renderErrorState()}
    </Container>
  );
};

ItunesContainer.propTypes = {
  artistName: PropTypes.string,
  songs: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  error: PropTypes.string,
  dispatchGetItunes: PropTypes.func,
  dispatchClearItunes: PropTypes.func,
  intl: PropTypes.object,
  maxWidth: PropTypes.number,
  padding: PropTypes.number
};

ItunesContainer.defaultProps = {
  maxWidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  artistName: selectArtistName(),
  songs: selectSongs(),
  musicVideo: selectmusicVideo(),
  error: selectError()
});

const mapDispatchToProps = dispatch => {
  const { requestGetItunes, clearItunes } = itunesContainerCreators;
  return {
    dispatchGetItunes: artistName => dispatch(requestGetItunes(artistName)),
    dispatchClearItunes: () => dispatch(clearItunes())
  };
};
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
