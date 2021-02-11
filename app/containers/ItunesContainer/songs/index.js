import React from 'react';
import { connect } from 'react-redux';import get from 'lodash/get';
import T from '@components/T';
import PropTypes from 'prop-types';
import { Skeleton, Input, Card } from 'antd';

import { selectArtistName, selectSongs, selectError } from '../selectors'
import { createStructuredSelector } from 'reselect';
import {CustomCard, CustomItemCard, Meta, MetaTitle, MetaDescription } from './styles';

const Songs = ({artistName, songs, error, loading }) => {

  const results = get(songs, 'results', []);
  const resultCount = get(songs, 'resultCount', 0);
  return (
    <>
      { results && (results.length !== 0 || loading) && (
        <CustomCard>
          <T id="matching_songs" values={{resultCount}} />
            {results.map((item, index) => (
              <CustomItemCard
                bodyStyle={{ padding: 10, width: '100%'}}
                style={{ height: 60 }}
                hoverable
                key={index}
                cover={
                  <img alt="example" src={item.artworkUrl60} width="60px" height="60px" style={{ minWidth: 60 }} />
                }
              >
                <Meta>
                  <MetaTitle>{item.trackName}</MetaTitle>
                  <MetaDescription type="secondary">{item.artistName}</MetaDescription>
                </Meta>
              </CustomItemCard>
            ))}
        </CustomCard>
       )}
    </>
  )
}

Songs.propTypes = {
  artistName: PropTypes.string,
  songs: PropTypes.shape({
    resultCount: PropTypes.Number,
    results: PropTypes.array
  }),
  error: PropTypes.string,
}

const mapStateToProps = createStructuredSelector({
  artistName: selectArtistName(),
  songs: selectSongs(),
  error: selectError()

})

export default connect(mapStateToProps)(Songs);