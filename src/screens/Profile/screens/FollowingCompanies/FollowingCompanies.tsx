import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import HeaderBackButton from 'components/HeaderBackButton';
import HeaderTitle from 'components/HeaderTitle';
import { themeVariables } from 'themes/themeVariables';
import ConnectedCompanyItem from '../../../Company/components/ConnectedCompanyItem';
import { Divider } from 'react-native-elements';

interface IProps {
  data: string[];
}

class FollowingCompanies extends Component<IProps> {
  static navigationOptions = {
    headerRight: <View />,
    headerTitle: <HeaderTitle title={'Following Companies'} />,
    headerLeft: <HeaderBackButton />
  };

  renderCompanyItem = ({ item }: { item: string }) => {
    return <ConnectedCompanyItem id={item} />;
  };

  render() {
    const { data } = this.props;
    return (
      <View
        style={{ flex: 1, backgroundColor: themeVariables.fill_base_color }}
      >
        <FlatList
          data={data}
          ItemSeparatorComponent={Divider}
          renderItem={this.renderCompanyItem}
          keyExtractor={(item: string, index: number) =>
            item + index.toString()
          }
        />
      </View>
    );
  }
}

export default FollowingCompanies;
