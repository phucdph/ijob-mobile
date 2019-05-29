import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import HeaderBackButton from 'components/HeaderBackButton';
import HeaderTitle from 'components/HeaderTitle';
import { themeVariables } from 'themes/themeVariables';

class FollowingCompany extends Component {
  static navigationOptions = {
    headerRight: <HeaderBackButton />,
    headerTitle: <HeaderTitle title={'Following Company'} />,
    headerLeft: <View />
  };

  renderCompanyItem = () => {
    return null;
  };

  render() {
    return (
      <View
        style={{ flex: 1, backgroundColor: themeVariables.fill_base_color }}
      >
        <FlatList data={[]} renderItem={this.renderCompanyItem} />
      </View>
    );
  }
}

export default FollowingCompany;
