import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { themeVariables } from 'themes/themeVariables';
import { ICompany } from '../../services/typings';
import { Icon, ListItem } from 'react-native-elements';
import { get } from 'lodash';

interface IProps {
  company: ICompany;
}

class About extends Component<IProps> {
  toName = (obj: any) => obj.name;

  renderInfo = () => {
    const { company } = this.props;
    const { address = [] } = company;
    return (
      <View style={{ padding: themeVariables.spacing_md }}>
        {(address || []).map((add: string, index: number) => (
          <ListItem
            key={add}
            leftElement={
              (index === 0) ? <View style={{ width: 25, alignItems: 'center' }}>
                <Icon
                  name={'ios-pin'}
                  type={'ionicon'}
                  color={themeVariables.accent_color}
                />
              </View> : <View style={{ width: 25 }}/>
            }
            containerStyle={{ padding: themeVariables.spacing_xs }}
            title={add.trim()}
            titleStyle={{ fontSize: 14 }}
          />
        ))}

        <ListItem
          leftElement={
            <View style={{ width: 25, alignItems: 'center' }}>
              <Icon
                name={'ios-call'}
                type={'ionicon'}
                color={themeVariables.accent_color}
              />
            </View>
          }
          containerStyle={{ padding: themeVariables.spacing_xs }}
          title={'0123456789'}
          titleStyle={{ fontSize: 14 }}
        />
        <ListItem
          leftElement={
            <View style={{ width: 25, alignItems: 'center' }}>
              <Icon
                name={'ios-globe'}
                type={'ionicon'}
                color={themeVariables.accent_color}
              />
            </View>
          }
          containerStyle={{ padding: themeVariables.spacing_xs }}
          title={'https://google.com.vn'}
          titleStyle={{ fontSize: 14 }}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={{ backgroundColor: 'white' }}>{this.renderInfo()}</View>
    );
  }
}

export default About;
