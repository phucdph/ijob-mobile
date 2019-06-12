import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { themeVariables } from 'themes/themeVariables';
import { noop, get, isArray } from 'lodash';
import { ISearchCompany } from '../services/typings';
import { ISkill } from 'components/Search/SearchSkill/services/typings';
import { ILocation } from 'components/Locations/services/typings';

interface IProps {
  defaultTitle: string;
  onPress?: () => void;
  data?:
    | ISearchCompany[]
    | ISkill[]
    | ILocation[]
    | { max?: number; min?: number };
}

class FilterButton extends Component<IProps> {
  static defaultProps = {
    onPress: noop,
    data: []
  };

  getTitle = () => {
    const { data = {}, defaultTitle } = this.props;
    if (isArray(data)) {
      if (data.length === 0) {
        return defaultTitle;
      }
      if (data.length === 1) {
        return get(data, '[0].name', defaultTitle);
      }
      if (data.length > 1) {
        return `${defaultTitle} (${data.length})`;
      }
    } else {
      if (data.max || data.min) {
        if (data.max && !data.min) {
          return `<${data.max}`;
        }
        if (!data.max && data.min) {
          return `>${data.min}`;
        }
        if (data.max && data.min) {
          return `${data.min}-${data.max}`;
        }
      }
    }

    return defaultTitle;
  };

  selected = () => {
    const { data } = this.props;
    if (isArray(data)) {
      return data.length > 0
    } else {
      if (data.max || data.min) {
        return true;
      }
    }
    return false;
  };

  render() {
    const { onPress, data } = this.props;
    const selected = this.selected();
    return (
      <Button
        type={'outline'}
        title={this.getTitle()}
        titleStyle={{
          color: selected ? 'white' : themeVariables.primary_color,
          fontSize: 15
        }}
        buttonStyle={{
          borderColor: themeVariables.primary_color,
          borderWidth: 1,
          paddingVertical: 6,
          backgroundColor:
            selected ? themeVariables.primary_color : 'white'
        }}
        icon={{
          name: 'ios-arrow-down',
          type: 'ionicon',
          size: 14,
          color: selected ? 'white' : themeVariables.primary_color
        }}
        iconRight={true}
        iconContainerStyle={{
          marginTop: 4,
          marginRight: 0
        }}
        onPress={onPress}
      />
    );
  }
}

export default FilterButton;
