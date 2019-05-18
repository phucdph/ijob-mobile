import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { themeVariables } from 'themes/themeVariables';
import WhiteSpace from 'components/base/WhiteSpace';
import { Divider } from 'react-native-elements';
import { IPageableData } from 'services/models';
import { IJob } from '../../../../../NewFeed/services/typings';
import JobItem from '../../../../../NewFeed/components/JobItem';
import ListItemSpinner from 'components/base/ListItemSpinner';

interface IProps {
  jobs: IPageableData<IJob>;
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingNext: boolean;
  onRefresh: () => void;
  onSearchNext: () => void;
}

class SearchJobs extends Component<IProps> {
  renderJobItem = ({ item }: { item: IJob }) => {
    return <JobItem data={item} />;
  };

  renderHeaderComponent = () => {
    const { jobs: {total} } = this.props;
    return (
      <View style={{ backgroundColor: themeVariables.fill_base_color, paddingHorizontal: themeVariables.spacing_lg}}>
        <WhiteSpace size={'md'} />
        <Text style={{ fontSize: 14 , color: themeVariables.secondary_text_color}}>{total} jobs</Text>
        <WhiteSpace size={'md'} />
      </View>
    );
  };

  render() {
    const { jobs, onSearchNext, isLoadingNext } = this.props;
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          data={jobs.data}
          renderItem={this.renderJobItem}
          ListHeaderComponent={this.renderHeaderComponent}
          keyExtractor={(item: IJob, index: number) => `${item.id}-${index}`}
          ItemSeparatorComponent={Divider}
          contentContainerStyle={{
            backgroundColor: 'white',
          }}
          onEndReached={onSearchNext}
          onEndReachedThreshold={0.3}
          scrollEventThrottle={16}
          ListFooterComponent={<ListItemSpinner loading={isLoadingNext} />}
        />
      </View>
    );
  }
}

export default SearchJobs;
