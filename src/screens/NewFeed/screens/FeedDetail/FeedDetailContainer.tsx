import React, { Component } from 'react';
import FeedDetail from './FeedDetail';

class FeedDetailContainer extends Component {
  static navigationOptions = FeedDetail.navigationOptions;

  render() {
    return (
      <FeedDetail/>
    );
  }
}

export default FeedDetailContainer;
