import React, { Component } from 'react';
import locationContainer from 'components/Locations/locationsContainer';
import { FlatList, View } from 'react-native';
import { themeVariables } from 'themes/themeVariables';
import { Divider, ListItem } from 'react-native-elements';
import { ILocation } from 'components/Locations/services/typings';
// @ts-ignore
import Touchable from 'react-native-platform-touchable';
import { NavigationInjectedProps, NavigationScreenConfigProps, withNavigation } from 'react-navigation';
import { noop } from 'lodash';
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

class LocationSelect extends Component<IProps> {
  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    return {
      headerLeft: <HeaderIconButton name={'ios-close'} type={'ionicon'} onPress={navigationService.goBack}/>,
      headerTitle: <HeaderTitle title={'Location'}/>,
      headerRight: null,
    };
  };

  componentDidMount() {
    const { loadLocations } = this.props;
    loadLocations();
  }


  renderLocationItem = ({ item }: { item: ILocation }) => {
    return (
      <Touchable onPress={() => this.handleSelectLocation(item)}>
        <ListItem title={item.name} />
      </Touchable>
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
          keyExtractor={(item: ILocation, index: number) => `${item.id}-${index}`}
          ItemSeparatorComponent={Divider}
        />
      </View>
    );
  }
}

export default withNavigation(locationContainer(LocationSelect) as any);
