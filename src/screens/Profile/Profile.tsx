import React, { Component } from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  NavigationInjectedProps,
  NavigationScreenConfigProps,
  withNavigation
} from 'react-navigation';
import HeaderSearchBar from 'components/HeaderSearchBar';
import { Divider, Icon, Image } from 'react-native-elements';
import { themeVariables } from 'themes/themeVariables';
import { IUser } from './services/typings';
import WhiteSpace from 'components/base/WhiteSpace';
import Avatar from 'components/base/Avatar';
import { get, noop } from 'lodash';
import { IJob, ISkill } from '../NewFeed/services/typings';
import Tag from '../NewFeed/components/Tag';
import { ImagePicker, Permissions } from 'expo';
import navigationService from 'services/navigationService';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { UserType } from '../../state';
import FlatList from 'components/base/FlatList';
import JobItem from '../NewFeed/components/JobItem';
// @ts-ignore
import Touchable from 'react-native-platform-touchable';

const mockData = [
  {
    _id: '5cec1ded2575ce3efd488af5',
    id: 'job_faace450-80a3-11e9-9a22-39bc7e46d514',
    name: 'E-Commerce PHP Programmer',
    skills: [
      {
        id: 'skill_2c00cd40-80a5-11e9-9a22-39bc7e46d514',
        name: 'Jquery'
      },
      {
        id: 'skill_2cba8050-80a5-11e9-9a22-39bc7e46d514',
        name: 'Web Development'
      },
      {
        id: 'skill_2cec8cd0-80a5-11e9-9a22-39bc7e46d514',
        name: 'MySQL'
      },
      {
        id: 'skill_2d0062f0-80a5-11e9-9a22-39bc7e46d514',
        name: 'PHP'
      },
      {
        id: 'skill_32353de0-80a5-11e9-9a22-39bc7e46d514',
        name: 'Css3'
      }
    ],
    salary: {
      from: 400,
      to: 800,
      currency: 'USD'
    },
    created_at: 1558630800000,
    company: {
      id: 'company_f9c59190-80a3-11e9-9a22-39bc7e46d514',
      name: 'GAMELOFT VIETNAM',
      avatar:
        'http://res.cloudinary.com/xtek/image/upload/v1558979803/img-company/knznutideogvk6eoy2md.png',
      location: [
        {
          _id: '5cec1c9e2575ce3efd4889d8',
          id: 'location_e02f94b0-80a3-11e9-9a22-39bc7e46d514',
          name: 'Đà Nẵng',
          __v: 0
        },
        {
          _id: '5cec1c9d2575ce3efd4889d7',
          id: 'location_e01a37f0-80a3-11e9-9a22-39bc7e46d514',
          name: 'Hà Nội',
          __v: 0
        },
        {
          _id: '5cec1c9e2575ce3efd4889da',
          id: 'location_e03a1c00-80a3-11e9-9a22-39bc7e46d514',
          name: 'Hồ Chí Minh',
          __v: 0
        }
      ]
    }
  }
];

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
      headerTitle: <HeaderSearchBar placeholder={placeholder || 'Search'} />
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
            {/*{isUpdatingAvatar && (*/}
            {/*  <View*/}
            {/*    style={{*/}
            {/*      zIndex: 3,*/}
            {/*      position: 'absolute',*/}
            {/*      width: themeVariables.profile_avatar_size - 3,*/}
            {/*      height: themeVariables.profile_avatar_size - 3,*/}
            {/*      borderRadius: 100,*/}
            {/*      backgroundColor: themeVariables.fill_base_color,*/}
            {/*      alignItems: 'center',*/}
            {/*      justifyContent: 'center'*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    <ActivityIndicator size={'large'} />*/}
            {/*  </View>*/}
            {/*)}*/}
            <Avatar
              source={{
                uri: avatar ? avatar : undefined
              }}
              size={themeVariables.profile_avatar_size}
            />
            <TouchableOpacity onPress={this.handleOpenActionSheet}>
              <Icon
                name={'md-create'}
                type={'ionicon'}
                containerStyle={{
                  backgroundColor: 'white',
                  position: 'absolute',
                  height: 35,
                  width: 35,
                  borderRadius: 50,
                  padding: 5,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 3
                }}
              />
            </TouchableOpacity>
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

  renderJobItem = ({ item }: { item: IJob }) => {
    return <JobItem data={item} showSkill={false}/>;
  };

  handleSeeAllJobPress = () => {
    navigationService.navigate({
      routeName: 'SavedJobs',
    })
  };


  renderSavedJob = () => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: themeVariables.spacing_md
        }}
      >
        <WhiteSpace/>
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
            Saved jobs
          </Text>
        </View>
        <View style={{ padding: themeVariables.spacing_md }}>
          <FlatList
            data={mockData}
            renderItem={this.renderJobItem}
            keyExtractor={(item: IJob) => item.id}
            ItemSeparatorComponent={Divider}
          />
        </View>

        <Divider/>
        <Touchable onPress={this.handleSeeAllJobPress}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: themeVariables.spacing_md}}>
            <Text style={{ fontSize: 16, color: themeVariables.primary_color}}>See all</Text>
          </View>
        </Touchable>
      </View>
    );
  };

  renderCompany = () => {
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
            Companies that you're following
          </Text>
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
    if (userType === UserType.GUEST) {
      return null;
    }
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
        <WhiteSpace
          style={{ backgroundColor: themeVariables.fill_base_color }}
        />
        {this.renderCompany()}
      </ScrollView>
    );
  }
}

export default withNavigation(Profile);
