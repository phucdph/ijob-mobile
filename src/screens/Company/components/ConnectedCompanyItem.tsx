 import React, { Component } from 'react';
import navigationService from 'services/navigationService';
import { ISearchCompany } from '../../Search/screens/SearchResult/services/typings';
import { ListItem } from 'react-native-elements';
import Avatar from 'components/base/Avatar';
import { locationFormatter } from 'utils/formatter';
import { themeVariables } from 'themes/themeVariables';
import { ICompany } from '../services/typings';
import { companyStateSelector } from '../selectors';
import { connect } from 'react-redux';
 import { TouchableOpacity } from 'react-native';

interface IProps {
  data?: ICompany;
  id: string;
}

class ConnectedCompanyItem extends Component<IProps> {
  handleCompanyPress = () => {
    const { id } = this.props.data as ICompany;
    navigationService.navigate({
      routeName: 'Company',
      params: {
        id,
      }
    });
  };

  render = () => {
    const { name, avatar, location } = this.props.data as ICompany;
    return (
      <ListItem
        leftElement={
          <Avatar size={45} source={{ uri: avatar }} />
        }
        Component={TouchableOpacity}
        title={name}
        subtitle={locationFormatter(location)}
        subtitleStyle={{ color: themeVariables.secondary_text_color }}
        onPress={this.handleCompanyPress}
      />
    );
  };
}

const mapStateToProps = (state: any, props: IProps) => {
  const { id } = props;
  return {
    data: companyStateSelector(state, { id }).data
  };
};

export default connect(mapStateToProps, null)(ConnectedCompanyItem as any);
