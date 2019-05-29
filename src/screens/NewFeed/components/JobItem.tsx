import React, { PureComponent } from 'react';
import { ListItem } from 'react-native-elements';
import { Text, TouchableOpacity, View } from 'react-native';
import { IJob, ISkill, ISource } from '../services/typings';
import {
  connectActionSheet,
  ActionSheetProps
} from '@expo/react-native-action-sheet';
import { themeVariables } from 'themes/themeVariables';
import WhiteSpace from 'components/base/WhiteSpace';
import Avatar from 'components/base/Avatar';
import Tag from './Tag';
import { locationFormatter, salaryFormatter } from 'utils/formatter';
import { noop } from 'lodash';
import moment from 'moment';
import navigationService from 'services/navigationService';
import { UserType } from '../../../state';
import { userTypeSelector } from '../../../selectors';
import { connect } from 'react-redux';

interface IProps extends Partial<ActionSheetProps> {
  data: IJob;
  userType?: UserType;
  showSkill?: boolean;
}

// @ts-ignore
@connectActionSheet
class JobItem extends PureComponent<IProps> {
  static defaultProps = {
    userType: UserType.GUEST,
    showSkill: true,
  };

  handleLongPress = () => {
    const { showActionSheetWithOptions = noop } = this.props;
    const options = ['Save', 'Cancel'];
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      buttonIndex => {
        console.log(buttonIndex);
      }
    );
  };

  handleFeedPress = () => {
    const { data } = this.props;
    navigationService.navigate({
      routeName: 'FeedDetail',
      params: {
        id: data.id
      }
    });
  };

  render() {
    const { data = {} as IJob, userType, showSkill } = this.props;
    const {
      company = {} as ISource,
      name,
      skills = [],
      salary,
      created_at,
      locations
    } = data;
    return (
      <ListItem
        // onLongPress={this.handleLongPress}
        Component={TouchableOpacity}
        onPress={this.handleFeedPress}
        leftElement={
          <Avatar
            rounded={true}
            size={45}
            title={company.name[0]}
            source={{
              uri: company.avatar
            }}
          />
        }
        containerStyle={{ alignItems: 'flex-start' }}
        title={name}
        rightElement={
          <View style={{ maxWidth: 80 }}>
            <Text style={{ fontSize: 12 }}>
              {moment(created_at).toNow(true)}
            </Text>
          </View>
        }
        subtitle={
          <View>
            <WhiteSpace size={'sm'} />
            {userType === UserType.USER ? (
              <Text style={{ color: 'grey' }}>{salaryFormatter(salary)}</Text>
            ) : (
              <TouchableOpacity>
                <Text style={{ color: 'grey' }}>Sign in to view salary</Text>
              </TouchableOpacity>
            )}
            {!!locations && <WhiteSpace size={'sm'} />}
            {!!locations && <Text>{locationFormatter(locations)}</Text>}
            { showSkill && <><WhiteSpace size={'sm'} />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {skills.map((s: ISkill, i: number) => (
                <Tag
                  name={s.name.trim()}
                  key={`${s.id}-${i}`}
                  style={{
                    marginRight: themeVariables.spacing_sm,
                    marginVertical: themeVariables.spacing_xs
                  }}
                />
              ))}
            </View>
            </>
            }
          </View>
        }
      />
    );
  }
}

const mapStateToProps = (state: any) => {
  return { userType: userTypeSelector(state) };
};

export default connect(
  mapStateToProps,
  null
)(JobItem);
