import React, { PureComponent } from 'react';
import { ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { ISearchHistory, SearchHistoryType } from '../../../services/typings';
import { themeVariables } from 'themes/themeVariables';
import navigationService from 'services/navigationService';

interface IProps {
  data: ISearchHistory;
}

class SearchHistoryItem extends PureComponent<IProps> {

  getIcon = () => {
    const { type } = this.props.data || {} as ISearchHistory;
    switch (type) {
      case SearchHistoryType.COMPANY: {
        return 'ios-search';
      }
      case SearchHistoryType.JOB: {
        return 'ios-search';
      }
      case SearchHistoryType.TEXT: {
        return 'ios-search';
      }
      default: {
        return 'ios-search';
      }
    }
  };

  handleItemPress = () => {
    const { type, content, name } = this.props.data || {} as ISearchHistory;
    switch (type) {
      case SearchHistoryType.COMPANY: {
        navigationService.navigate({
          routeName: 'Company',
          params: {
            id: content
          },
        });
        break;
      }
      case SearchHistoryType.JOB: {
        navigationService.navigate({
          routeName: 'Job',
          params: {
            id: content
          },
        });
        break;
      }
      case SearchHistoryType.TEXT: {
        navigationService.navigate({
          routeName: 'SearchResult',
          params: {
            searchText: name
          },
        });
        break;
      }
      default: {
        break;
      }
    }
  };

  render() {
    const { name } = this.props.data || {} as ISearchHistory;
    return (
      <ListItem
        leftIcon={{ name: this.getIcon(), type: 'ionicon' }}
        title={name}
        titleStyle={{ fontSize: 14 }}
        containerStyle={{ justifyContent: 'center', alignItems: 'center', paddingVertical: themeVariables.spacing_md }}
        Component={TouchableOpacity}
        onPress={this.handleItemPress}
      />
    );
  }
}

export default SearchHistoryItem;
