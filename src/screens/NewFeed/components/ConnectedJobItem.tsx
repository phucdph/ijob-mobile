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
import { noop, get } from 'lodash';
import moment from 'moment';
import navigationService from 'services/navigationService';
import { UserType } from '../../../state';
import { connect } from 'react-redux';
import { jobItemSelector } from '../selectors';
import { saveJob, unsaveJob } from '../actions';
import { userTypeSelector } from '../../../selectors';
import { Icon }from 'react-native-elements';
interface IProps extends Partial<ActionSheetProps> {
  data?: IJob;
  id: string;
  userType?: UserType;
  dispatchSaveJob?: (id: string) => void;
  dispatchUnsaveJob?: (id: string) => void;
  showSkill?: boolean;
  showAvatar?: boolean;
  showBookmark?: boolean;
}

// @ts-ignore
@connectActionSheet
class ConnectedJobItem extends PureComponent<IProps> {
  static defaultProps = {
    userType: UserType.GUEST,
    showSkill: true,
    showAvatar: true,
    showBookmark: true,
  };

  handleLongPress = () => {
    const {
      showActionSheetWithOptions = noop,
      data = { saved: false, id: '' },
      dispatchSaveJob = noop,
      dispatchUnsaveJob = noop
    } = this.props;
    const { id, saved } = data;
    const options = [saved ? 'Unsave' : 'Save', 'Cancel'];
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0: {
            saved ? dispatchUnsaveJob(id) : dispatchSaveJob(id);
            return;
          }
          default: {
            return;
          }
        }
      }
    );
  };

  handleFeedPress = () => {
    const { data = {} as IJob } = this.props;
    navigationService.push({
      routeName: 'FeedDetail',
      params: {
        id: data.id
      }
    });
  };

  toName = (i: any) => i.name;

  render() {
    const {
      data = {} as IJob,
      userType,
      showSkill,
      id,
      showAvatar,
       showBookmark
    } = this.props;
    if (!id || !data.id) {
      return null;
    }
    const {
      company = {} as ISource,
      name,
      skills = [],
      salary,
      created_at,
      saved = false,
    } = data;
    const locations = get(data, 'company.location', [])
      .map(this.toName)
      .join(', ');
    return (
      <ListItem
        onLongPress={this.handleLongPress}
        Component={TouchableOpacity}
        onPress={this.handleFeedPress}
        leftElement={
          showAvatar ? (
            <Avatar
              rounded={true}
              size={45}
              title={get(company, 'name[0]', '')}
              source={{
                uri: company.avatar
              }}
            />
          ) : null
        }
        containerStyle={{ alignItems: 'flex-start' }}
        title={name}
        rightElement={
          <View style={{ maxWidth: 80 }}>
            <Text style={{ fontSize: 12 }}>
              {moment(created_at).toNow(true)}
            </Text>
            <WhiteSpace/>
            {showBookmark && saved && <Icon name={'ios-bookmark'} type={'ionicon'} color={themeVariables.accent_color}/>}
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
            <WhiteSpace size={'sm'} />
            <Text>{locations}</Text>
            {showSkill && (
              <>
                <WhiteSpace size={'sm'} />
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
            )}
          </View>
        }
      />
    );
  }
}

const mapStateToProps = (state: any, props: IProps) => {
  const { id } = props;
  return {
    data: jobItemSelector(state, { id }),
    userType: userTypeSelector(state)
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchSaveJob: (id: string) => dispatch(saveJob(id)),
    dispatchUnsaveJob: (id: string) => dispatch(unsaveJob(id))
  };
};

export default (connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedJobItem) as any) as React.ComponentClass<IProps>;
