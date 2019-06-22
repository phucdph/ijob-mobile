import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { themeVariables } from 'themes/themeVariables';
import WhiteSpace from 'components/base/WhiteSpace';
import { Divider } from 'react-native-elements';
import { IPageableData } from 'services/models';
import { IJob } from '../../../../../NewFeed/services/typings';
import JobItem from '../../../../../NewFeed/components/JobItem';
import ListItemSpinner from 'components/base/ListItemSpinner';
import Spinner from 'components/base/Spinner';
import { size } from 'lodash';
import { ISearchHistory } from '../../../../services/typings';

interface IProps {
  jobs: IPageableData<IJob>;
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingNext: boolean;
  onRefresh: () => void;
  onSearchNext: () => void;
  onCreateHistory: (req: ISearchHistory) => void;
}

class SearchJobs extends Component<IProps> {
  renderJobItem = ({ item }: { item: IJob }) => {
    return <JobItem data={item} isFromSearch={true}/>;
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
    const { jobs, onSearchNext, isLoadingNext, onRefresh, isRefreshing, isLoading } = this.props;
    if (isLoading && size(jobs.data) === 0) {
      return <Spinner loading={true} />;
    }
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
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          ListFooterComponent={<ListItemSpinner loading={isLoadingNext} />}
        />
      </View>
    );
  }
}

export default SearchJobs;
