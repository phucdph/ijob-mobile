import React, { Component } from 'react';
import { View, SectionList } from 'react-native';
import { themeVariables } from 'themes/themeVariables';
import { Divider, Icon, ListItem } from 'react-native-elements';
import { omit, noop, values, throttle } from 'lodash';
// @ts-ignore
import Touchable from 'react-native-platform-touchable';
import {
  NavigationInjectedProps,
  NavigationScreenConfigProps,
  withNavigation
} from 'react-navigation';
import HeaderIconButton from 'components/HeaderIconButton';
import navigationService from 'services/navigationService';
import HeaderTitle from 'components/HeaderTitle';
import Spinner from 'components/base/Spinner';
import {
  ISearchSKillRequest,
  ISkill
} from 'components/Search/SearchSkill/services/typings';
import { IPageableData } from 'services/models';
import HeaderSearchBarInput from 'components/HeaderSearchBarInput';
import ListItemSpinner from 'components/base/ListItemSpinner';
import WhiteSpace from 'components/base/WhiteSpace';
import companySearchContainer from 'components/Search/SearchCompany/companySearchContainer';
import { ISearchCompany } from '../../../screens/Search/screens/SearchResult/services/typings';
import Avatar from 'components/base/Avatar';
import NoResultFound from 'components/Search/components/NoResultFound';

interface IProps extends NavigationInjectedProps {
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingNext: boolean;
  onSearchNext: () => void;
  onRefresh: () => void;
  companies: IPageableData<ISearchCompany>;
  onSearch: (req: ISearchSKillRequest) => void;
}

interface IState {
  value: { [key: string]: ISearchCompany };
  previousSelected: ISearchCompany[];
}

class SearchCompanyMultiSelect extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    const onDone = navigation.getParam('onDone', noop);
    return {
      headerLeft: (
        <HeaderIconButton
          name={'ios-close'}
          type={'ionicon'}
          onPress={navigationService.goBack}
        />
      ),
      headerTitle: <HeaderTitle title={'Company'} />,
      headerRight: (
        <HeaderIconButton
          name={'ios-checkmark'}
          type={'ionicon'}
          onPress={onDone}
        />
      )
    };
  };
  previousSelectedIds: { [key: string]: boolean } = {};

  constructor(props: IProps) {
    super(props);
    const value = props.navigation.getParam('value', []);
    const mapValue = {} as any;
    value.forEach((elm: ISkill) => {
      mapValue[elm.id] = elm;
      this.previousSelectedIds[elm.id] = true;
    });
    this.state = {
      value: mapValue,
      previousSelected: value
    };
    this.handleSearch = throttle(this.handleSearch, 300, {
      leading: false,
      trailing: true
    });
  }

  componentDidMount() {
    const { onSearch, navigation } = this.props;
    onSearch({
      searchText: '',
      limit: 30,
      offset: 0
    });
    navigation.setParams({
      onDone: this.handleDone
    });
  }

  handleSearch = (searchText: string) => {
    const { onSearch } = this.props;
    onSearch({
      searchText,
      limit: 30,
      offset: 0
    });
  };

  handleDone = () => {
    const { navigation } = this.props;
    const { value } = this.state;
    navigation.goBack();
    const onChange = navigation.getParam('onChange', noop);
    onChange(values(value));
  };

  handleCheckboxPress = (item: ISearchCompany, checked: boolean) => {
    if (checked) {
      this.setState((prevState: IState) => {
        return { value: omit(prevState.value, [item.id]) };
      });
    } else {
      this.setState((prevState: IState) => {
        return { value: { ...prevState.value, [item.id]: item } };
      });
    }
  };

  renderCompanyItem = ({ item }: { item: ISearchCompany }) => {
    const { name, id, avatar } = item;
    const { value } = this.state;
    const checked = !!value[id];
    return (
      <ListItem
        Component={Touchable}
        leftElement={
          <Avatar size={45} rounded={true} source={{ uri: avatar }} />
        }
        rightIcon={
          checked ? (
            <Icon
              type={'ionicon'}
              name={'ios-checkmark'}
              color={themeVariables.primary_color}
              size={40}
            />
          ) : (
            <View />
          )
        }
        title={name}
        onPress={() => this.handleCheckboxPress(item, checked)}
      />
    );
  };

  renderSectionSeparator = ({ trailingItem }: any) => {
    if (trailingItem) {
      return null;
    }
    return (
      <WhiteSpace style={{ backgroundColor: themeVariables.fill_base_color }} />
    );
  };

  renderEmptyComponent = () => {
    const { isLoading, isLoadingNext, companies } = this.props;
    if (isLoading || isLoadingNext || companies.data.length > 0) { return null; }
    return <NoResultFound/>;
  };

  render() {
    const {
      onRefresh,
      isRefreshing,
      isLoading,
      companies,
      onSearchNext,
      isLoadingNext
    } = this.props;
    const { previousSelected } = this.state;
    return (
      <View
        style={{ flex: 1, backgroundColor: themeVariables.fill_base_color }}
      >
        <View style={{ height: 44 }}>
          <HeaderSearchBarInput
            cancelButton={false}
            containerStyle={{ backgroundColor: 'white' }}
            inputContainerStyle={{
              backgroundColor: themeVariables.fill_base_color
            }}
            onChangeText={this.handleSearch}
          />
        </View>
        {companies.data.length === 0 &&
        previousSelected.length === 0 &&
        isLoading ? (
          <Spinner loading={true} />
        ) : (
          <SectionList
            sections={[
              {
                data: previousSelected,
                renderItem: this.renderCompanyItem,
                keyExtractor: (item: ISearchCompany, index: number) =>
                  `PREVIOUS_${item.id}_${index}`
              },
              {
                data: companies.data,
                renderItem: this.renderCompanyItem,
                keyExtractor: (item: ISkill, index: number) =>
                  `SEARCH_${item.id}_${index}`
              }
            ]}
            keyboardShouldPersistTaps={'handled'}
            keyboardDismissMode={'on-drag'}
            contentContainerStyle={{ backgroundColor: 'white' }}
            SectionSeparatorComponent={this.renderSectionSeparator}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            ListEmptyComponent={this.renderEmptyComponent}
            ItemSeparatorComponent={Divider}
            onEndReached={onSearchNext}
            onEndReachedThreshold={0.3}
            scrollEventThrottle={16}
            ListFooterComponent={<ListItemSpinner loading={isLoadingNext} />}
          />
        )}
      </View>
    );
  }
}

export default withNavigation(companySearchContainer(
  SearchCompanyMultiSelect
) as any);
