import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationScreenConfigProps } from 'react-navigation';
import HeaderSearchBar from 'components/HeaderSearchBar';
import { themeVariables } from 'themes/themeVariables';
import NotificationItem from './components/NotificationItem';
import FlatList from 'components/base/FlatList';
import { INotification } from './services/typings';
import { Divider } from 'react-native-paper';
import ListItemSpinner from 'components/base/ListItemSpinner';
import Spinner from 'components/base/Spinner';

interface IProps {
  onLoad: () => void;
  onLoadNext: () => void;
  onRefresh: () => void;
  data: INotification[];
  isLoading: boolean;
  isLoadingNext: boolean;
  isRefreshing: boolean;
}

class Notification extends Component<IProps> {
  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    return {
      headerTitle: <HeaderSearchBar />
    };
  };

  componentDidMount(): void {
    this.props.onLoad();
  }

  renderItem = ({ item }: { item: INotification }) => {
    return <NotificationItem data={item} />;
  };

  render() {
    const {
      data,
      onLoadNext,
      onRefresh,
      isRefreshing,
      isLoadingNext,
      isLoading
    } = this.props;
    if (isLoading && data.length === 0) {
      return <Spinner loading={true} />;
    }
    return (
      <View
        style={{ flex: 1, backgroundColor: themeVariables.fill_base_color }}
      >
        <FlatList
          data={data}
          renderItem={this.renderItem}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          keyExtractor={(item, index: number) => `${item.id}_${index}`}
          ItemSeparatorComponent={Divider}
          onEndReached={onLoadNext}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<ListItemSpinner loading={isLoadingNext} />}
        />
      </View>
    );
  }
}

export default Notification;
