import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Skeleton, Input, Card, Switch } from 'antd';
import { Container, CustomTitle, CustomCard, RightContent, Item } from './styles';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectArtistName, selectSongs, selectmusicVideo, selectError } from './selectors';
import { itunesContainerCreators } from './reducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';
import { colors } from '@themes';
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
  const [darkMode, setDarkMode] = useState(false);

  const handleOnChange = value => {
    if (!isEmpty(value)) {
      dispatchGetItunes(value);
    } else {
      dispatchClearItunes();
    }
  };
  const debouceHandleOnChange = debounce(handleOnChange, 200);

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
    songs: <Songs />,
    musicVideo: <MusicVideo />,
  };
  
  const theme = (({ primary, secondary, text }) => ({ fg: primary, bg: secondary, text: text }))
    (darkMode ? colors.theme.darkMode : colors.theme.lightMode)

  return (
    <Container maxWidth={maxWidth} padding={padding}>
      <CustomTitle>Itunes</CustomTitle>

      <RightContent>
        <Switch checkedChildren="Dark" unCheckedChildren="light"
          onChange={() => setDarkMode(!darkMode)} />
      </RightContent>

      <Search
        placeholder="search artist"
        allowClear
        enterButton
        size="large"
        style={{ width: 300, marginTop: 20 }}
        onChange={e => debouceHandleOnChange(e.target.value)}
      />

      <ThemeProvider theme={theme}>
        <CustomCard
          style={{ margin: 20, color: theme.text }}
          bodyStyle={{margin: 0, background: theme.bg}}
          headStyle={{background: theme.bg, color: theme.text}}
          tabList={tabList}
          activeTabKey={currtab.tab}
          onTabChange={key => {
            onTabChange(key, 'tab');
          }}>
          <Item style={{ margin: 0, color: theme.text }}>
            {contentListNoTitle[currtab.tab]}
          </Item>
        </CustomCard>
      </ThemeProvider>

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
