import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectArtistName, selectMusic, selectError } from './selectors'

const Music = ({music}) => {
  return(
    <h1>Music Content</h1>
  )
}


export default connect(mapStateToProps)(Music);