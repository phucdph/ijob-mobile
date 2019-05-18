import React, { Component } from 'react';
import locationContainer from 'components/Locations/locationsContainer';
import { FlatList, View } from 'react-native';
import { themeVariables } from 'themes/themeVariables';
import { CheckBox, Divider } from 'react-native-elements';
import { omit, noop, values } from 'lodash';
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

interface IProps extends NavigationInjectedProps {
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingNext: boolean;
  onSearchNext: () => void;
  onRefresh: () => void;
  locations: ILocation[];
  loadLocations: () => void;
}

interface IState {
  value: { [key: string]: ILocation };
}

class LocationMultiSelect extends Component<IProps, IState> {
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
      headerTitle: <HeaderTitle title={'Location'} />,
      headerRight: (
        <HeaderIconButton
          name={'ios-checkmark'}
          type={'ionicon'}
          onPress={onDone}
        />
      )
    };
  };

  constructor(props: IProps) {
    super(props);
    const value = props.navigation
      .getParam('value', [])
      .reduce((obj: any, item: ILocation) => {
        obj[item.id] = item;
        return obj;
      }, {});
    this.state = {
      value
    };
  }

  componentDidMount() {
    const { loadLocations, navigation } = this.props;
    loadLocations();
    navigation.setParams({
      onDone: this.handleDone
    })
  }

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

  renderLocationItem = ({ item }: { item: ILocation }) => {
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
          padding: themeVariables.spacing_lg,
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

  render() {
    const { onRefresh, isRefreshing, isLoading, locations } = this.props;
    if (locations.length === 0 && isLoading) {
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
          data={locations}
          renderItem={this.renderLocationItem}
          ItemSeparatorComponent={Divider}
          keyExtractor={(item: ILocation, index: number) =>
            `${item.id}-${index}`
          }
        />
      </View>
    );
  }
}

export default withNavigation(locationContainer(LocationMultiSelect) as any);
