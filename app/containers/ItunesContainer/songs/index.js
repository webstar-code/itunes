import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import T from '@components/T';
import PropTypes from 'prop-types';
import { Skeleton } from 'antd';
import { selectArtistName, selectSongs, selectError } from '../selectors';
import { createStructuredSelector } from 'reselect';
import { CustomCard, CustomItemCard, Meta, MetaTitle, MetaDescription } from './styles';

const Songs = ({ artistName = null, songs = {}, error = null }) => {
  const results = get(songs, 'results', []);
  const resultCount = get(songs, 'resultCount', 0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEmpty(artistName) && !songs?.results?.length) {
      setLoading(true);
    }
  }, [artistName]);

  useEffect(() => {
    const loaded = get(songs, 'results', null) || error;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [songs]);

  const Error = () => {
    let localerror;
    if (error) {
      localerror = error;
    } else if (!get(songs, 'resultCount', 0)) {
      localerror = 'search_songs_default';
    }
    return (
      !loading &&
      localerror && (
        <CustomCard color={error ? 'true' : 'false'}>
          <T id={localerror} />
        </CustomCard>
      )
    );
  };

  return (
    <>
      {results && (results.length !== 0 || loading) && (
        <>
          <Skeleton loading={loading} active>
            <T id="matching_songs" values={{ resultCount }} />
            {results.map((item, index) => (
              <CustomItemCard
                bodyStyle={{ padding: 10, width: '100%' }}
                style={{ height: 60 }}
                hoverable
                key={index}
                cover={
                  <img alt="example" src={item.artworkUrl60} width="60px" height="60px" style={{ minWidth: 60 }} />
                }
              >
                <Meta>
                  <MetaTitle>{item.trackName}</MetaTitle>
                  <MetaDescription>{item.artistName}</MetaDescription>
                </Meta>
              </CustomItemCard>
            ))}
          </Skeleton>
        </>
      )}
      {Error()}
    </>
  );
};

Songs.propTypes = {
  artistName: PropTypes.string,
  songs: PropTypes.array,
  error: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  artistName: selectArtistName(),
  songs: selectSongs(),
  error: selectError()
});

export default connect(mapStateToProps)(Songs);
