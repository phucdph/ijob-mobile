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

interface IProps {
  companies: IPageableData<ISearchCompany>;
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingNext: boolean;
  onRefresh: () => void;
  onSearchNext: () => void;
}

class SearchCompanies extends Component<IProps> {
  renderCompanyItem = ({ item }: { item: ISearchCompany }) => {
    const { name, avatar } = item;
    return (
      <ListItem
        leftElement={
          <Avatar size={45} rounded={true} source={{ uri: avatar }} />
        }
        title={name}
        subtitle={'Ho Chi Minh'}
        subtitleStyle={{ color: themeVariables.secondary_text_color }}
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
    const { companies, isLoadingNext } = this.props;
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
          ListFooterComponent={<ListItemSpinner loading={isLoadingNext} />}
        />
      </View>
    );
  }
}

export default SearchCompanies;
