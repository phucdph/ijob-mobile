import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import HeaderBackButton from 'components/HeaderBackButton';
import HeaderTitle from 'components/HeaderTitle';
import { themeVariables } from 'themes/themeVariables';
import ConnectedJobItem from '../../../NewFeed/components/ConnectedJobItem';
import { Divider } from 'react-native-elements';

interface IProps {
  data: string[];
}

class SavedJobs extends Component<IProps> {
  static navigationOptions = {
    headerRight: <View />,
    headerTitle: <HeaderTitle title={'Saved Jobs'} />,
    headerLeft: <HeaderBackButton />
  };

  renderCompanyItem = ({ item }: { item: string }) => {
    return <ConnectedJobItem id={item} showBookmark={false}/>;
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
          keyExtractor={(item: string, index: number) => `${item}_${index}`}
        />
      </View>
    );
  }
}

export default SavedJobs;
