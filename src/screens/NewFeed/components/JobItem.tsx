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
import { salaryFormatter } from 'utils/formatter';
import { noop } from 'lodash';
import moment from 'moment';
import navigationService from 'services/navigationService';
import { UserType } from '../../../state';

interface IProps extends Partial<ActionSheetProps> {
  data: IJob;
  userType?: UserType;
}

// @ts-ignore
@connectActionSheet
class JobItem extends PureComponent<IProps> {
  static defaultProps = {
    userType: UserType.GUEST,
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
    navigationService.navigate({ routeName: 'FeedDetail' });
  };

  render() {
    const { data = {} as IJob, userType } = this.props;
    const {
      company = {} as ISource,
      name,
      skill = [],
      salary,
      created_at
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
            {/*<Text>*/}
            {/*  Lorem ipsum dolor sit amet, consectetur adipisicing elit.*/}
            {/*  Architecto consequatur consequuntur culpa doloribus ducimus*/}
            {/*  exercitationem hic*/}
            {/*</Text>*/}
            <WhiteSpace size={'sm'} />
            {userType === UserType.USER ? <Text style={{ color: 'grey' }}>{salaryFormatter(salary)}</Text> :
            <TouchableOpacity>
              <Text style={{ color: 'grey' }}>Sign in to view salary</Text>
            </TouchableOpacity>
            }
            <WhiteSpace size={'sm'} />
            <Text>Ho Chi Minh</Text>
            <WhiteSpace size={'sm'} />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {skill.map((s: ISkill, i: number) => (
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
          </View>
        }
      />
    );
  }
}

export default JobItem;
