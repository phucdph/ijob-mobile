import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import HeaderSearchBarInput from 'components/HeaderSearchBarInput';
import {
  NavigationInjectedProps,
  NavigationScreenConfigProps,
  withNavigation
} from 'react-navigation';
import skillsContainer from 'components/Search/SearchSkill/skillsContainer';
import {
  ISearchSKillRequest,
  ISkill
} from 'components/Search/SearchSkill/services/typings';
import { Divider, ListItem } from 'react-native-elements';
import { IPageableData } from 'services/models';
import { throttle, noop } from 'lodash';
import Spinner from 'components/base/Spinner';
import ListItemSpinner from 'components/base/ListItemSpinner';
import { themeVariables } from 'themes/themeVariables';
// @ts-ignore
import Touchable from 'react-native-platform-touchable';

interface IProps extends NavigationInjectedProps {
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingNext: boolean;
  onSearch: (req: ISearchSKillRequest) => void;
  onSearchNext: () => void;
  onRefresh: () => void;
  skills: IPageableData<ISkill>;
}

class SearchSkillSelect extends Component<IProps> {
  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    const onSearch = navigation.getParam('onSearch', noop);
    return {
      headerRight: null,
      headerLeft: null,
      headerTitle: <HeaderSearchBarInput onChangeText={onSearch} />
    };
  };

  selectedIds = this.props.navigation.getParam('value', []).map((s: any) => s.id);

  componentDidMount(): void {
    const { onSearch, navigation } = this.props;
    navigation.setParams({
      onSearch: throttle(this.handleSearch, 300, {
        leading: false,
        trailing: true
      })
    });
    onSearch({
      searchText: '',
      limit: 20,
      offset: 0,
      excluded_ids: this.selectedIds
    });
  }

  handleSelectSkill = (skill: ISkill) => {
    const { navigation } = this.props;
    navigation.goBack();
    const onSelectSkill = navigation.getParam('onSelectSkill', noop);
    onSelectSkill(skill);
  };

  handleSearch = (searchText: string) => {
    const { onSearch } = this.props;
    onSearch({
      searchText,
      limit: 20,
      offset: 0,
      excluded_ids: this.selectedIds
    });
  };

  renderSkillItem = ({ item }: { item: ISkill }) => {
    return (
      <Touchable onPress={() => this.handleSelectSkill(item)}>
        <ListItem title={item.name} />
      </Touchable>
    );
  };

  render() {
    const {
      skills,
      isLoading,
      onSearchNext,
      isLoadingNext,
      onRefresh,
      isRefreshing
    } = this.props;
    if (skills.data.length === 0 && isLoading) {
      return <Spinner loading={true} />;
    }
    return (
      <View
        style={{ flex: 1, backgroundColor: themeVariables.fill_base_color }}
      >
        <FlatList
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          contentContainerStyle={{ backgroundColor: 'white' }}
          keyboardDismissMode={'on-drag'}
          keyboardShouldPersistTaps={'handled'}
          data={skills.data}
          renderItem={this.renderSkillItem}
          keyExtractor={(item: ISkill, index: number) => `${item.id}-${index}`}
          ListFooterComponent={<ListItemSpinner loading={isLoadingNext} />}
          ItemSeparatorComponent={Divider}
          onEndReached={onSearchNext}
          onEndReachedThreshold={0.3}
          scrollEventThrottle={16}
        />
      </View>
    );
  }
}

export default skillsContainer(withNavigation(SearchSkillSelect as any) as any);
