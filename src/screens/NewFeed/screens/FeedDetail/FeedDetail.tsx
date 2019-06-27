import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  RefreshControl
} from 'react-native';
import Constants from 'expo-constants';
import { Button, Icon, ListItem } from 'react-native-elements';
import HeaderBackButton from 'components/HeaderBackButton';
import { themeVariables } from 'themes/themeVariables';
import Tag from '../../components/Tag';
import { IJob, IJobDetail, ISkill, ISource } from '../../services/typings';
import WhiteSpace from 'components/base/WhiteSpace';
import { isIOS } from 'utils/platform';
import { get, noop } from 'lodash';
import Avatar from 'components/base/Avatar';
import { salaryFormatter } from 'utils/formatter';
import { ILocation } from 'components/Locations/services/typings';
import {
  ActionSheetProps,
  connectActionSheet
} from '@expo/react-native-action-sheet';
import navigationService from 'services/navigationService';
import { UserType } from '../../../../state';

interface IProps extends Partial<ActionSheetProps> {
  data: IJobDetail | IJob;
  onLoad: () => void;
  onRefresh: () => void;
  onSave: () => void;
  onUnsave: () => void;
  onApply: () => void;
  isLoading: boolean;
  isRefresing: boolean;
  userType: UserType;
}
// @ts-ignore
@connectActionSheet
class FeedDetail extends Component<IProps> {
  static navigationOptions = () => {
    return {
      header: null
    };
  };

  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  renderInfo = () => {
    const { salary, skills = [] } = this.props.data;
    const locations = get(this.props.data, 'company.location', [])
      .map((l: ILocation) => l.name)
      .join(', ');
    return (
      <View style={{ padding: themeVariables.spacing_md }}>
        <ListItem
          leftElement={
            <View style={{ width: 25, alignItems: 'center' }}>
              <Icon
                name={'ios-card'}
                type={'ionicon'}
                color={themeVariables.accent_color}
              />
            </View>
          }
          containerStyle={{ padding: themeVariables.spacing_xs }}
          title={salaryFormatter(salary)}
          titleStyle={{ fontSize: 14 }}
        />
        <ListItem
          leftElement={
            <View style={{ width: 25, alignItems: 'center' }}>
              <Icon
                name={'ios-pin'}
                type={'ionicon'}
                color={themeVariables.accent_color}
              />
            </View>
          }
          containerStyle={{ padding: themeVariables.spacing_xs }}
          title={locations}
          titleStyle={{ fontSize: 14 }}
        />
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
      </View>
    );
  };

  renderRequirementSection = () => {
    const { require = [] } = this.props.data as IJobDetail;
    if (require.length === 0) {
      return null;
    }
    return (
      <View>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          Your Skills and Experience
        </Text>
        <View style={{ padding: themeVariables.spacing_md }}>
          {require.map((item: string, index: number) => (
            <ListItem
              key={index}
              title={item}
              // leftElement={
              //   <View style={{ width: 10, alignItems: 'center' }}>
              //     <Icon name={'circle'} type={'font-awesome'} size={8} />
              //   </View>
              // }
              titleStyle={{ fontSize: 14 }}
              containerStyle={{ padding: themeVariables.spacing_xs }}
            />
          ))}
        </View>
      </View>
    );
  };

  renderBenefitSection = () => {
    const { benefit = [] } = this.props.data as IJobDetail;
    if (benefit.length === 0) {
      return null;
    }
    return (
      <View>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          Why You'll Love Working Here
        </Text>
        <View style={{ padding: themeVariables.spacing_md }}>
          {benefit.map((item: string, index: number) => (
            <ListItem
              key={index}
              title={item}
              // leftElement={
              //   {/*<View style={{ width: 10, alignItems: 'center' }}>*/}
              //   {/*  <Icon name={'circle'} type={'font-awesome'} size={8} />*/}
              //   {/*</View>*/}
              // }
              titleStyle={{ fontSize: 14 }}
              containerStyle={{ padding: themeVariables.spacing_xs }}
            />
          ))}
        </View>
      </View>
    );
  };

  handleMenuPress = () => {
    const {
      showActionSheetWithOptions = noop,
      data = { saved: false, id: '' },
      onSave = noop,
      onUnsave = noop
    } = this.props;
    const { saved } = data;
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
            saved ? onUnsave() : onSave();
            return;
          }
          default: {
            return;
          }
        }
      }
    );
  };

  handleCompanyPress = () => {
    const { id } = get(this.props.data, 'company', { id: '' });
    navigationService.navigate({
      routeName: 'Company',
      params: {
        id
      }
    });
  };

  toName = (i: any) => i.name;

  renderHeader = () => {
    const company = get(this.props.data, 'company', {});
    const { name = '', avatar } = company as ISource;
    const { saved = false } = this.props.data;
    const locations = get(this.props.data, 'company.location', [])
      .map(this.toName)
      .join(', ');
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            paddingLeft: themeVariables.spacing_sm
          }}
        >
          <HeaderBackButton color={'black'} />
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <ListItem
              leftElement={
                <Avatar
                  size={45}
                  source={{
                    uri: avatar
                  }}
                />
              }
              title={name}
              subtitle={locations}
              subtitleStyle={{
                color: themeVariables.secondary_text_color
              }}
              containerStyle={{
                alignItems: 'flex-start'
              }}
              onPress={this.handleCompanyPress}
            />
          </View>
        </View>
        <View
          style={{
            minWidth: 50,
            height: '100%',
            justifyContent: 'flex-start'
          }}
        >
          <WhiteSpace size={'lg'} />
          <Icon
            name={'ios-more'}
            type={'ionicon'}
            onPress={this.handleMenuPress}
          />
          {saved && (
            <Icon
              name={'ios-bookmark'}
              type={'ionicon'}
              color={themeVariables.accent_color}
            />
          )}
        </View>
      </View>
    );
  };

  handleApply = () => {
    const { applied } = this.props.data;
    const { onApply } = this.props;
    if (!applied) {
      onApply();
    }
  };

  render() {
    const { name, applied } = this.props.data;
    const { isRefresing, onRefresh, userType } = this.props;
    return (
      <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        {this.renderHeader()}
        <ScrollView
          contentContainerStyle={{ padding: themeVariables.spacing_lg }}
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode={'on-drag'}
          refreshControl={
            <RefreshControl refreshing={isRefresing} onRefresh={onRefresh} />
          }
        >
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{name}</Text>
          {this.renderInfo()}
          <WhiteSpace size={'md'} />
          {this.renderRequirementSection()}
          <WhiteSpace size={'md'} />
          {this.renderBenefitSection()}
          {userType === UserType.USER && (
            <>
              <WhiteSpace size={'lg'} />
              <Button
                title={
                  applied ? 'You was interested this job' : `I'm intersted`
                }
                buttonStyle={{ backgroundColor: themeVariables.accent_color }}
                disabled={applied}
                titleStyle={{
                  color: 'white'
                }}
                onPress={this.handleApply}
              />
              <WhiteSpace size={'lg'} />
            </>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default FeedDetail;
