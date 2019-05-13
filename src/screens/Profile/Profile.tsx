import React, { Component } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NavigationInjectedProps, NavigationScreenConfigProps, withNavigation } from 'react-navigation';
import HeaderSearchBar from 'components/HeaderSearchBar';
import { Icon, Image } from 'react-native-elements';
import { themeVariables } from 'themes/themeVariables';
import { IUser } from './services/typings';
import WhiteSpace from 'components/base/WhiteSpace';
import Avatar from 'components/base/Avatar';
import { get, noop } from 'lodash';
import { ISkill } from '../NewFeed/services/typings';
import Tag from '../NewFeed/components/Tag';
import { ImagePicker, Permissions } from 'expo';
import navigationService from 'services/navigationService';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { UserType } from '../../state';

interface IProps extends NavigationInjectedProps {
  profile: IUser;
  loadProfile: () => void;
  refreshProfile: () => void;
  isLoading?: boolean;
  isRefreshing?: boolean;
  isUpdatingAvatar?: boolean;
  onUpdateAvatar: (req: string) => void;
  showActionSheetWithOptions?: (req: any) => void;
  userType: UserType;
}
// @ts-ignore
@connectActionSheet
class Profile extends Component<IProps> {
  static defaultProps = {
    isLoading: false,
    isRefreshing: false,
    showActionSheetWithOptions: noop
  };

  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    const placeholder = get(navigation, 'state.params.placeholder', '');
    return {
      headerRight: null,
      headerLeft: null,
      headerTitle: <HeaderSearchBar placeholder={placeholder} />
    };
  };

  componentDidMount(): void {
    const { loadProfile, profile, navigation, userType } = this.props;
    if (userType === UserType.USER) {
      loadProfile();
      const { firstName, lastName } = profile;
      navigation.setParams({
        placeholder: `${firstName} ${lastName}`
      });
    } else {
      navigation.setParams({
        placeholder: 'Search'
      });
    }
  }

  componentDidUpdate(prevProps: Readonly<IProps>): void {
    const { firstName, lastName } = get(this.props, 'profile', {}) as IUser;
    const { navigation } = this.props;
    if (firstName && lastName) {
      if (
        firstName !== get(prevProps, 'profile.firstName') ||
        lastName !== get(prevProps, 'profile.lastName')
      ) {
        navigation.setParams({
          placeholder: `${firstName} ${lastName}`
        });
      }
    }
  }

  handleOpenActionSheet = () => {
    const options = ['Take new photo', 'Select new from gallery', 'Cancel'];
    const cancelButtonIndex = 2;
    // @ts-ignore
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      (buttonIndex: number) => {
        switch (buttonIndex) {
          case 0: {
            this.handleTakeNewPhoto();
            break;
          }
          case 1: {
            this.handleImagePicker();
            break;
          }
          default: {
            break;
          }
        }
      }
    );
  };

  handleTakeNewPhoto = async () => {
    const [res1, res2] = await Promise.all([
      Permissions.askAsync(Permissions.CAMERA),
      Permissions.askAsync(Permissions.CAMERA_ROLL)
    ]);
    if (res1.status !== 'granted' || res2.status !== 'granted') {
      return;
    }
    const img = (await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
      aspect: [1, 1]
    })) as any;
    if (img.cancelled) {
      return;
    }
    this.props.onUpdateAvatar(img.base64);
  };

  handleImagePicker = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      return;
    }
    const img = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [1, 1]
    })) as any;
    if (img.cancelled) {
      return;
    }
    this.props.onUpdateAvatar(img.base64);
  };

  renderCoverAndAvatar = () => {
    const { profile, isUpdatingAvatar } = this.props;
    const { avatar, firstName, lastName } = profile;
    return (
      <View style={{ backgroundColor: 'white' }}>
        <Image
          source={require('../../../assets/default/default_cover.jpg')}
          resizeMode={'cover'}
          style={{ height: 200, width: themeVariables.window_width }}
        />
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: themeVariables.fill_base_color,
            alignItems: 'center',
            position: 'absolute',
            left:
              (themeVariables.window_width -
                themeVariables.profile_avatar_size) /
              2,
            top:
              themeVariables.profile_cover_size -
              themeVariables.profile_avatar_size / 2,
            borderRadius: 100,
            borderColor: 'white'
          }}
        >
          <View style={{ zIndex: 2 }}>
            {isUpdatingAvatar && (
              <View
                style={{
                  zIndex: 3,
                  position: 'absolute',
                  width: themeVariables.profile_avatar_size - 3,
                  height: themeVariables.profile_avatar_size - 3,
                  borderRadius: 100,
                  backgroundColor: themeVariables.fill_base_color,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ActivityIndicator size={'large'} />
              </View>
            )}
            <Avatar
              source={{
                uri: avatar ? avatar : undefined
              }}
              title={firstName[0]}
              size={themeVariables.profile_avatar_size}
              rounded={true}
              containerStyle={{ borderWidth: 5, borderColor: 'white' }}
              showEditButton={true}
              onEditPress={this.handleOpenActionSheet}
            />
            {/*<TouchableOpacity onPress={this.handleOpenActionSheet}>*/}
            {/*  <Icon*/}
            {/*    name={'md-create'}*/}
            {/*    type={'ionicon'}*/}
            {/*    containerStyle={{*/}
            {/*      backgroundColor: 'white',*/}
            {/*      position: 'absolute',*/}
            {/*      height: 35,*/}
            {/*      width: 35,*/}
            {/*      borderRadius: 50,*/}
            {/*      padding: 5,*/}
            {/*      right: 0,*/}
            {/*      bottom: 0,*/}
            {/*      justifyContent: 'center',*/}
            {/*      alignItems: 'center',*/}
            {/*      shadowColor: '#000',*/}
            {/*      shadowOffset: {*/}
            {/*        width: 0,*/}
            {/*        height: 1*/}
            {/*      },*/}
            {/*      shadowOpacity: 0.22,*/}
            {/*      shadowRadius: 2.22,*/}
            {/*      elevation: 3*/}
            {/*    }}*/}
            {/*  />*/}
            {/*</TouchableOpacity>*/}
          </View>
        </View>
        <View
          style={{
            zIndex: 1,
            // position: 'absolute',
            marginTop:
              themeVariables.profile_avatar_size / 2 +
              themeVariables.spacing_lg,
            flex: 1,
            alignItems: 'center'
          }}
        >
          <Text
            style={{ fontSize: 18, fontWeight: 'bold' }}
          >{`${firstName} ${lastName}`}</Text>
        </View>
        <WhiteSpace size={'xl'} />
      </View>
    );
  };

  handleEditSkillPress = () => {
    navigationService.navigate({ routeName: 'ListOfSkillModal' });
  };

  renderSkill = () => {
    const { skills = [] } = this.props.profile;
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: themeVariables.spacing_md
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Skill</Text>
          <Icon
            name={'md-create'}
            type={'ionicon'}
            onPress={this.handleEditSkillPress}
          />
        </View>
        {skills.length > 0 ? (
          <View style={{ padding: themeVariables.spacing_md }}>
            {
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {(skills || []).map((s: ISkill, i: number) => (
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
            }
          </View>
        ) : (
          <TouchableOpacity onPress={this.handleEditSkillPress}>
            <View
              style={{
                padding: themeVariables.spacing_md,
                justifyContent: 'center',
                alignItems: 'center',
                height: 80
              }}
            >
              <View
                style={{ paddingHorizontal: themeVariables.spacing_xl * 2 }}
              >
                <Text style={{ textAlign: 'center', fontSize: 15 }}>
                  You currently do not have any skills. Tap here to add.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  renderSavedJob = () => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: themeVariables.spacing_md
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: themeVariables.title_font_size
            }}
          >
            Saved job
          </Text>
          <Icon name={'md-create'} type={'ionicon'} />
        </View>
        <View style={{ padding: themeVariables.spacing_md }} />
      </View>
    );
  };

  handleEditInfoPress = () => {
    navigationService.navigate({ routeName: 'EditInfoModal' });
  };

  renderInfo = () => {
    const { email } = this.props.profile;
    const location = get(this.props, 'profile.location.name');
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: themeVariables.spacing_md
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: themeVariables.title_font_size
            }}
          >
            Information
          </Text>
          <Icon
            name={'md-create'}
            type={'ionicon'}
            onPress={this.handleEditInfoPress}
          />
        </View>
        <View
          style={{ padding: themeVariables.spacing_md, flexDirection: 'row' }}
        >
          <View style={{ flex: 0.3 }}>
            <Text style={{ fontWeight: 'bold' }}>Email:</Text>
          </View>
          <View style={{ flex: 0.7, alignItems: 'flex-end' }}>
            <Text>{email}</Text>
          </View>
        </View>
        {location && (
          <View
            style={{ padding: themeVariables.spacing_md, flexDirection: 'row' }}
          >
            <View style={{ flex: 0.3 }}>
              <Text style={{ fontWeight: 'bold' }}>Address:</Text>
            </View>
            <View style={{ flex: 0.7, alignItems: 'flex-end' }}>
              <Text>{location}</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  render() {
    const { refreshProfile, isRefreshing = false, userType } = this.props;
    if (userType === UserType.GUEST) return null;
    return (
      <ScrollView
        style={{ backgroundColor: themeVariables.fill_base_color }}
        keyboardShouldPersistTaps={'handled'}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshProfile}
          />
        }
      >
        {this.renderCoverAndAvatar()}
        <WhiteSpace
          style={{ backgroundColor: themeVariables.fill_base_color }}
        />
        {this.renderInfo()}
        <WhiteSpace
          style={{ backgroundColor: themeVariables.fill_base_color }}
        />
        {this.renderSkill()}
        <WhiteSpace
          style={{ backgroundColor: themeVariables.fill_base_color }}
        />
        {this.renderSavedJob()}
      </ScrollView>
    );
  }
}

export default withNavigation(Profile);
