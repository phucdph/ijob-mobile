import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { themeVariables } from 'themes/themeVariables';
import { noop, get } from 'lodash';
import { ISearchCompany } from '../services/typings';
import { ISkill } from 'components/Search/SearchSkill/services/typings';
import { ILocation } from 'components/Locations/services/typings';

interface IProps {
  defaultTitle: string;
  onPress?: () => void;
  data?: ISearchCompany[] | ISkill[] | ILocation[];
}

class FilterButton extends Component<IProps> {
  static defaultProps = {
    onPress: noop,
    data: [],
  };

  getTitle = () => {
    const { data = [], defaultTitle } = this.props;
    if (data.length === 0) {
      return defaultTitle;
    }
    if (data.length === 1) {
      return get(data, '[0].name', defaultTitle);
    }
    if (data.length > 1) {
      return `${defaultTitle} (${data.length})`;
    }
    return defaultTitle;
  };

  render() {
    const { onPress, data = [] } = this.props;
    return (
      <Button
        type={'outline'}
        title={this.getTitle()}
        titleStyle={{
          color: data.length > 0 ? 'white' : themeVariables.primary_color,
          fontSize: 15
        }}
        buttonStyle={{
          borderColor: themeVariables.primary_color,
          borderWidth: 1,
          paddingVertical: 6,
          backgroundColor:
            data.length > 0 ? themeVariables.primary_color : 'white'
        }}
        icon={{
          name: 'ios-arrow-down',
          type: 'ionicon',
          size: 14,
          color: data.length > 0 ? 'white' : themeVariables.primary_color
        }}
        iconRight={true}
        iconContainerStyle={{
          marginTop: 4,
          marginRight: 0,
        }}
        onPress={onPress}
      />
    );
  }
}

export default FilterButton;
