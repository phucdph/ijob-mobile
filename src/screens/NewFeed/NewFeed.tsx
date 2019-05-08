import * as React from 'react';
import { View } from 'react-native';
import HeaderSearchBar from 'components/HeaderSearchBar';
import Feed from './components/Feed';
import WhiteSpace from 'components/base/WhiteSpace';
import { themeVariables } from 'themes/themeVariables';
import { noop } from 'lodash';
import { IFeed } from './services/typings';
import { IPageableData } from 'services/models';
import ListItemSpinner from 'components/base/ListItemSpinner';
import Spinner from 'components/base/Spinner';
import FlatList from 'components/base/FlatList';

interface IProps {
  data: IPageableData<IFeed>;
  onRefresh?: () => void;
  isLoading?: boolean;
  isLoadingNext?: boolean;
  isRefreshing?: boolean;
  onLoadMore?: () => void;
}

class NewFeed extends React.Component<IProps> {

  static defaultProps = {
    onRefresh: noop,
    isLoading: false,
    isLoadingNext: false,
    isRefreshing: false,
    onLoadMore: noop,
  };
  static navigationOptions = () => {
    return {
      headerTitle: (
          <HeaderSearchBar />
      )
    };
  };

  renderFeedItem = ({ item }: { item: IFeed; index: number }) => {
    return <Feed data={item} key={item.id}/>;
  };

  renderItemSeparatorComponent = () => <WhiteSpace style={{ backgroundColor: themeVariables.fill_base_color }}/>;

  render() {
    const { data, onRefresh, onLoadMore, isLoadingNext, isRefreshing, isLoading } = this.props;
    if (data.data.length === 0 && isLoading) { return <Spinner loading={true}/>; }
    return (
      <View
        style={{ flex: 1, backgroundColor: themeVariables.fill_base_color }}
      >
        <FlatList
          data={data.data}
          refreshing={isRefreshing}
          renderItem={this.renderFeedItem}
          onRefresh={onRefresh}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          keyExtractor={(item: IFeed, index: number) =>
            `${item.id}-${index}`
          }
          showsVerticalScrollIndicator={false}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.5}
          scrollEventThrottle={16}
          ListFooterComponent={<ListItemSpinner loading={isLoadingNext} />}
          initialNumToRender={10}
          maxToRenderPerBatch={20}
          shouldRasterizeIOS={true}
        />
      </View>
    );
  }
}

export default NewFeed;
