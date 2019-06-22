import React, { Component } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { themeVariables } from 'themes/themeVariables';
import WhiteSpace from 'components/base/WhiteSpace';
import { Divider, ListItem } from 'react-native-elements';
import { ISearchCompany } from '../../services/typings';
import { IPageableData } from 'services/models';
import Avatar from 'components/base/Avatar';
import ListItemSpinner from 'components/base/ListItemSpinner';
import { PAGE_SIZE } from '../../../../../NewFeed/constants';
import { size } from 'lodash';
import Spinner from 'components/base/Spinner';
import navigationService from 'services/navigationService';
import { locationFormatter } from 'utils/formatter';
import { ISearchHistory, SearchHistoryType } from '../../../../services/typings';

interface IProps {
  companies: IPageableData<ISearchCompany>;
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingNext: boolean;
  onRefresh: () => void;
  onSearchNext: () => void;
  onCreateHistory: (req: ISearchHistory) => void;
}

class SearchCompanies extends Component<IProps> {

  handleCompanyPress = (item: ISearchCompany) => {
    const { id, name, avatar } = item;
    const { onCreateHistory } = this.props;
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
    const { name, avatar, location } = item;
    return (
      <ListItem
        leftElement={
          <Avatar size={45} source={{ uri: avatar }} />
        }
        title={name}
        subtitle={locationFormatter(location)}
        subtitleStyle={{ color: themeVariables.secondary_text_color }}
        onPress={() => this.handleCompanyPress(item)}
      />
    );
  };

  renderHeaderComponent = () => {
    const { companies: {total} } = this.props;
    return (
      <View style={{ backgroundColor: themeVariables.fill_base_color, paddingHorizontal: themeVariables.spacing_lg}}>
        <WhiteSpace size={'md'} />
        <Text style={{ fontSize: 14 , color: themeVariables.secondary_text_color}}>{total} companies</Text>
        <WhiteSpace size={'md'} />
      </View>
    );
  };

  handleLoadingMore= () => {
    const { onSearchNext, companies } = this.props;
    if (size(companies.data)< PAGE_SIZE) { return; }
    onSearchNext();
  };

  render() {
    const { companies, isLoadingNext, onRefresh, isRefreshing, isLoading } = this.props;
    if (isLoading && size(companies.data) === 0) {
      return <Spinner loading={true} />;
    }
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          data={companies.data}
          renderItem={this.renderCompanyItem}
          ListHeaderComponent={this.renderHeaderComponent}
          ItemSeparatorComponent={Divider}
          keyExtractor={(item: ISearchCompany, index: number) =>
            `${item.id}-${index}`
          }
          contentContainerStyle={{
            backgroundColor: 'white',
          }}
          onEndReached={this.handleLoadingMore}
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

export default SearchCompanies;
