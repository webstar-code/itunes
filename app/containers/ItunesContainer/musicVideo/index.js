import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import T from '@components/T';
import PropTypes from 'prop-types';
import { Skeleton, Card, Row, Col } from 'antd';
import { selectArtistName, selectmusicVideo, selectError } from '../selectors'
import { createStructuredSelector } from 'reselect';
import { CustomCard, CustomItemCard, Meta, MetaTitle, MetaDescription } from './styles';

const MusicVideo = ({ artistName, musicVideo, error, loading }) => {
  const results = get(musicVideo, 'results', []);
  const resultCount = get(musicVideo, 'resultCount', 0);

  return (
    <>
      { results && (results.length !== 0 || loading) && (
        <CustomCard>
          <T id="matching_musicVideos" values={{ resultCount }} />
          <Row gutter={[24, 24]} style={{marginTop: 20}}>
            {results.map((item, index) => (
                  <Col span={12} key={index} >  
                <CustomItemCard span={12}
                  bodyStyle={{ padding: 10 }}
                  style={{}}
                  hoverable
                  cover={
                    <img alt="example" src={item.artworkUrl100} width="100px" height="100px" style={{ minWidth: `100` }} />
                  }
                >
                  <Meta>
                    <MetaTitle>{item.trackName}</MetaTitle>
                    <MetaDescription type="secondary">{item.artistName}</MetaDescription>
                  </Meta>
                </CustomItemCard>
              </Col>
            ))}
          </Row>
        </CustomCard>
      )}
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