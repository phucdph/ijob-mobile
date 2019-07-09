import React, { Component } from 'react';
import { Rating as RNRating } from 'react-native-elements';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { ratingSelector, ratingStateSelector } from './selectors';
import WhiteSpace from 'components/base/WhiteSpace';
import { themeVariables } from 'themes/themeVariables';

interface IProps {
  id: string;
  rating?: number;
}

class Rating extends Component<IProps> {
  render() {
    const { rating = 0 } = this.props;
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row'}}>
        <RNRating readonly={true} startingValue={rating} imageSize={20} />
        <WhiteSpace horizontal={true}/>
        <Text style={{ fontSize: 16, color: themeVariables.secondary_text_color }}>({Number(rating).toFixed(1)}/5.0)</Text>
      </View>
      </View>
    );
  }
}

const mapStateToProps = (state: any, props: IProps) => {
  const { id } = props;
  return {
    rating: ratingSelector(state, { id })
  }
};

export default connect(mapStateToProps)(Rating);
