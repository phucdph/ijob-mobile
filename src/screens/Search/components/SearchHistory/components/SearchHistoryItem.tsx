import React, { PureComponent } from 'react';
import { Icon, ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { ISearchHistory, SearchHistoryType } from '../../../services/typings';
import { themeVariables } from 'themes/themeVariables';
import navigationService from 'services/navigationService';
import { get } from 'lodash';
import Avatar from 'components/base/Avatar';

interface IProps {
  data: ISearchHistory;
}

class SearchHistoryItem extends PureComponent<IProps> {

  getIcon = () => {
    const { type, content } = this.props.data || {} as ISearchHistory;
    switch (type) {
      case SearchHistoryType.COMPANY: {
        return <Avatar source={{uri: content.avatar}} size={19}/>;
      }
      case SearchHistoryType.JOB: {
        return <Icon name={'briefcase-search'} type={'material-community'} size={19}/>;
      }
      case SearchHistoryType.TEXT: {
        return <Icon name={'ios-search'} type={'ionicon'}/>;
      }
      default: {
        return <Icon name={'ios-search'} type={'ionicon'}/>;
      }
    }
  };

  handleItemPress = () => {
    const { type, content, name } = this.props.data || {} as ISearchHistory;
    console.log(type);
    switch (type) {
      case SearchHistoryType.COMPANY: {
        navigationService.navigate({
          routeName: 'Company',
          params: {
            id: get(content, 'id')
          },
        });
        break;
      }
      case SearchHistoryType.JOB: {
        navigationService.navigate({
          routeName: 'FeedDetail',
          params: {
            id: get(content, 'id')
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
        leftElement={this.getIcon()}
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
