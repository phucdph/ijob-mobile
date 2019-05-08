import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import {
  NavigationInjectedProps,
  NavigationScreenConfigProps,
  withNavigation
} from 'react-navigation';
import HeaderSearchBar from 'components/HeaderSearchBar';
import { Avatar, Icon, Image } from 'react-native-elements';
import { themeVariables } from 'themes/themeVariables';
import { IUser } from './services/typings';
import WhiteSpace from 'components/base/WhiteSpace';
import { get } from 'lodash';
import { ISkill } from '../NewFeed/services/typings';
import Tag from '../NewFeed/components/Tag';
import { ImagePicker, Permissions } from 'expo';
import { cloudiaryService } from 'services/cloudiaryService';

interface IProps extends NavigationInjectedProps {
  profile: IUser;
  loadProfile: () => void;
  refreshProfile: () => void;
  isLoading?: boolean;
  isRefreshing?: boolean;
}

class Profile extends Component<IProps> {
  static defaultProps = {
    isLoading: false,
    isRefreshing: false
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
    const { loadProfile, profile, navigation } = this.props;
    loadProfile();
    const { firstName, lastName } = profile;
    navigation.setParams({
      placeholder: `${firstName} ${lastName}`
    });
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

  handleImagePicker = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      return;
    }
    const img = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [3, 3]
    })) as any;
    if (img.cancelled) {
      return;
    }
    const res = await cloudiaryService.uploadImage(img.base64);
    console.log(res);
  };

  renderCoverAndAvatar = () => {
    const { profile } = this.props;
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
            <Avatar
              source={{
                uri: avatar ? avatar : undefined
              }}
              title={firstName[0]}
              size={themeVariables.profile_avatar_size}
              rounded={true}
              containerStyle={{ borderWidth: 5, borderColor: 'white' }}
            />
            <TouchableOpacity onPress={this.handleImagePicker}>
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

  renderSkill = () => {
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
          <Icon name={'md-create'} type={'ionicon'} />
        </View>
        <View style={{ padding: themeVariables.spacing_md }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {[{ id: '1', name: 'ReactJS' }, { id: '2', name: 'React Native' }].map((s: ISkill, i: number) => (
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
          <Text style={{ fontWeight: 'bold', fontSize: themeVariables.title_font_size }}>Saved job</Text>
          {/*<Icon name={'md-create'} type={'ionicon'} />*/}
        </View>
        <View style={{ padding: themeVariables.spacing_md }} />
      </View>
    );
  };

  renderInfo = () => {
    const { email } = this.props.profile;
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
          <Text style={{ fontWeight: 'bold', fontSize: themeVariables.title_font_size }}>Information</Text>
          <Icon name={'md-create'} type={'ionicon'} />
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
      </View>
    );
  };

  render() {
    const { refreshProfile, isRefreshing = false } = this.props;
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
