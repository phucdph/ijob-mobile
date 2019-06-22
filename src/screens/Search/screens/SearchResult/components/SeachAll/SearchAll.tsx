import React, { Component } from 'react';
import { ISearchCompany, ISearchJob } from '../../services/typings';
import { IPageableData } from 'services/models';
import { FlatList, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import WhiteSpace from 'components/base/WhiteSpace';
import { themeVariables } from 'themes/themeVariables';
import { Divider, ListItem } from 'react-native-elements';
import Avatar from 'components/base/Avatar';
import { get, size } from 'lodash';
import JobItem from '../../../../../NewFeed/components/JobItem';
import { IJob } from '../../../../../NewFeed/services/typings';
import Spinner from 'components/base/Spinner';
import navigationService from 'services/navigationService';
import { locationFormatter } from 'utils/formatter';
import { ISearchHistory, SearchHistoryType } from '../../../../services/typings';

interface IProps {
  companies: IPageableData<ISearchCompany>;
  jobs: IPageableData<ISearchJob>;
  isRefreshing?: boolean;
  isLoading?: boolean;
  isLoadingNext?: boolean;
  onRefresh: () => void;
  onCompanySeeAll: () => void;
  onJobSeeAll: () => void;
  onCreateHistory: (req: ISearchHistory) => void;
}

class SearchAll extends Component<IProps> {
  static defaultProps = {
    isRefreshing: false,
    isLoading: false
  };

  getCompanies = () => get(this.props, 'companies.data', []).slice(0, 5);

  getJobs = () => get(this.props, 'jobs.data', []).slice(0, 5);

  handleCompanyPress = (item: ISearchCompany) => {
    const { onCreateHistory  } = this.props;
    const { id, name, avatar } = item;
    navigationService.navigate({
      routeName: 'Company',
      params: {
        id,
      }
    });
    onCreateHistory({
      type: SearchHistoryType.COMPANY,
      name,
      content: {
        id, avatar, name
      }
    })
  };

  renderCompanyItem = ({ item }: { item: ISearchCompany }) => {
    const { name, avatar, id, location } = item;
    return (
      <ListItem
        leftElement={
          <Avatar size={45} rounded={true} source={{ uri: avatar }} />
        }
        title={name}
        subtitle={locationFormatter(location)}
        subtitleStyle={{ color: themeVariables.secondary_text_color }}
        onPress={() => this.handleCompanyPress(item)}
      />
    );
  };

  renderJobItem = ({ item }: { item: IJob }) => {
    return <JobItem data={item} isFromSearch={true}/>;
  };

  renderCompanySection = () => {
    const { companies, onCompanySeeAll } = this.props;
    if (companies.total === 0) {
      return null;
    }
    return (
      <>
        <View
          style={{
            backgroundColor: 'white',
            paddingVertical: themeVariables.spacing_lg
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItem: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: themeVariables.spacing_lg
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Companies</Text>
            {companies.total > 5 && (
              <TouchableOpacity onPress={onCompanySeeAll}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: themeVariables.primary_color
                  }}
                >
                  See all
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <WhiteSpace size={'lg'} />
          <Divider />
          <FlatList
            data={this.getCompanies()}
            renderItem={this.renderCompanyItem}
            ItemSeparatorComponent={Divider}
            keyExtractor={(item: ISearchCompany, index: number) =>
              `${item.id}-${index}`
            }
            scrollEnabled={false}
          />
        </View>
        <WhiteSpace
          style={{ backgroundColor: themeVariables.fill_base_color }}
        />
      </>
    );
  };

  renderJobSection = () => {
    const { jobs, onJobSeeAll } = this.props;
    if (jobs.total === 0) {
      return null;
    }
    return (
      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: themeVariables.spacing_lg
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItem: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: themeVariables.spacing_lg
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Jobs</Text>
          {jobs.total > 5 && (
            <TouchableOpacity onPress={onJobSeeAll}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: themeVariables.primary_color
                }}
              >
                See all
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <WhiteSpace size={'lg'} />
        <Divider />
        <FlatList
          data={this.getJobs()}
          renderItem={this.renderJobItem}
          ItemSeparatorComponent={Divider}
          keyExtractor={(item: IJob, index: number) => `${item.id}-${index}`}
          scrollEnabled={false}
        />
      </View>
    );
  };

  render() {
    const {
      isRefreshing = false,
      onRefresh,
      isLoading = false,
      companies,
      jobs
    } = this.props;
    if (isLoading && size(companies.data) === 0 && size(jobs.data) === 0) {
      return <Spinner loading={true} />;
    }
    return (
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <WhiteSpace style={{ backgroundColor: themeVariables.fill_base_color }}/>
        {this.renderCompanySection()}
        {this.renderJobSection()}
      </ScrollView>
    );
  }
}

export default SearchAll;
