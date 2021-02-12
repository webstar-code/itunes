import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import T from '@components/T';
import PropTypes from 'prop-types';
import { Skeleton, Card, Row, Col } from 'antd';
import { selectArtistName, selectmusicVideo, selectError } from '../selectors'
import { createStructuredSelector } from 'reselect';
import { CustomCard, CustomItemCard, Meta, MetaTitle, MetaDescription } from './styles';

const MusicVideo = ({ artistName, musicVideo = {}, error = null }) => {
  const results = get(musicVideo, 'results', []);
  const resultCount = get(musicVideo, 'resultCount', 0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEmpty(artistName) && !musicVideo?.results?.length) {
      setLoading(true);
    }
  }, []);
  useEffect(() => {
    const loaded = get(musicVideo, 'results', null);
    if (loading && loaded) {
      setLoading(false);
    }
  }, [musicVideo]);

  const Error = () => {
    let localerror;
    if (error) {
      localerror = error;
    } else if (!get(musicVideo, 'resultCount', 0)) {
      localerror = 'search_musicVideo_default';
    }
    return (
      !loading &&
      localerror && (
        <CustomCard color={error ? "true" : "false"}>
          <T id={localerror} />
        </CustomCard>
      )
    );
  };

  return (
    <>
      { results && (results.length !== 0 || loading) && (
        <>
          <T id="matching_musicVideos" values={{ resultCount }} />
          <Row gutter={[24, 24]} style={{ marginTop: 10 }}>
            {results.map((item, index) => (
              <Col span={12} key={index} >
                <CustomItemCard
                  bodyStyle={{ padding: 10, height: '100%' }}
                  style={{ height: 160 }}
                  cover={
                    <img alt="example" src={item.artworkUrl100} width="100px" height="100px" style={{ minWidth: `100` }} />
                  }
                >
                  <Meta>
                    <MetaTitle>{item.trackName}</MetaTitle>
                    <MetaDescription>{item.artistName}</MetaDescription>
                  </Meta>
                </CustomItemCard>
              </Col>
            ))}
          </Row>
        </>
      )}
      {Error()}
    </>

  )
}

MusicVideo.propTypes = {
  artistName: PropTypes.string,
  musicVideo: PropTypes.shape({
    resultCount: PropTypes.Number,
    results: PropTypes.array
  }),
  error: PropTypes.string,
}

const mapStateToProps = createStructuredSelector({
  artistName: selectArtistName(),
  musicVideo: selectmusicVideo(),
  error: selectError()
})

export default connect(mapStateToProps)(MusicVideo);