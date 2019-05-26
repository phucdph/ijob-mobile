import React, { Component } from 'react';
import { FlatList, View, SectionList } from 'react-native';
import { themeVariables } from 'themes/themeVariables';
import { CheckBox, Divider } from 'react-native-elements';
import { omit, noop, values, throttle } from 'lodash';
import { ILocation } from 'components/Locations/services/typings';
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
import skillsContainer from 'components/Search/SearchSkill/skillsContainer';
import {
  ISearchSKillRequest,
  ISkill
} from 'components/Search/SearchSkill/services/typings';
import { IPageableData } from 'services/models';
import HeaderSearchBarInput from 'components/HeaderSearchBarInput';
import ListItemSpinner from 'components/base/ListItemSpinner';
import WhiteSpace from 'components/base/WhiteSpace';
const memoizeOne = require('memoize-one');

interface IProps extends NavigationInjectedProps {
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingNext: boolean;
  onSearchNext: () => void;
  onRefresh: () => void;
  skills: IPageableData<ISkill>;
  onSearch: (req: ISearchSKillRequest) => void;
}

interface IState {
  value: { [key: string]: ISkill };
  previousSelected: ISkill[];
}

class SearchSkillMultiSelect extends Component<IProps, IState> {
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
      headerTitle: <HeaderTitle title={'Skill'} />,
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

  memoizeFilterSkills = memoizeOne(
    (data: ISkill[], selected: { [key: string]: boolean }) =>
      data.filter((item: ISkill) => {
        return !selected[item.id];
      })
  );

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

  handleCheckboxPress = (item: ILocation, checked: boolean) => {
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

  renderSkillItem = ({ item }: { item: ISkill }) => {
    const { name, id } = item;
    const { value } = this.state;
    const checked = !!value[id];
    return (
      <CheckBox
        checked={checked}
        title={name}
        Component={Touchable}
        onPress={() => this.handleCheckboxPress(item, checked)}
        containerStyle={{
          borderWidth: 0,
          backgroundColor: 'white',
          margin: 0,
          marginLeft: 0,
          marginRight: 0,
          padding: themeVariables.spacing_lg
        }}
      />
    );
  };

  handleSelectLocation = (location: ILocation) => {
    const { navigation } = this.props;
    navigation.goBack();
    const onSelectLocation = navigation.getParam('onSelectLocation', noop);
    onSelectLocation(location);
  };

  renderSectionSeparator = ({ trailingItem }: any) => {
    if (trailingItem) {
      return null;
    }
    return (
      <WhiteSpace style={{ backgroundColor: themeVariables.fill_base_color }} />
    );
  };

  render() {
    const {
      onRefresh,
      isRefreshing,
      isLoading,
      skills,
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
        {skills.data.length === 0 &&
        previousSelected.length === 0 &&
        isLoading ? (
          <Spinner loading={true} />
        ) : (
          <SectionList
            sections={[
              {
                data: previousSelected,
                renderItem: this.renderSkillItem,
                keyExtractor: (item: ISkill, index: number) =>
                  `PREVIOUS_${item.id}_${index}`
              },
              {
                data: this.memoizeFilterSkills(skills.data, this.previousSelectedIds),
                renderItem: this.renderSkillItem,
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

export default withNavigation(skillsContainer(SearchSkillMultiSelect) as any);
