import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import {
  NavigationInjectedProps,
  NavigationScreenConfigProps,
  withNavigation
} from 'react-navigation';
import HeaderSearchBar from 'components/HeaderSearchBar';
import { Avatar, Icon } from 'react-native-elements';
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
}

class Profile extends Component<IProps> {
  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    const placeholder = get(navigation, 'state.params.placeholder', '');
    return {
      headerRight: null,
      headerLeft: null,
      headerTitle: (
        <HeaderSearchBar backButton={true} placeholder={placeholder} />
      )
    };
  };

  componentDidMount(): void {
    const { navigation } = this.props;
    const { firstName, lastName } = this.props.profile || ({} as IUser);
    navigation.setParams({
      placeholder: `${firstName} ${lastName}`
    });
  }

  componentDidUpdate(prevProps: Readonly<IProps>): void {
    const id = get(this.props, 'profile.id');
    const { navigation } = this.props;
    if (id) {
      if (id !== get(prevProps, 'profile.id')) {
        const { firstName, lastName } = this.props.profile;
        navigation.setParams({
          placeholder: `${firstName} ${lastName}`
        });
      }
    }
  }

  handleImagePicker = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') { return; }
    const img = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [1, 1]
    })) as any;
    if (img.cancelled) {
      return;
    }
    const res = await cloudiaryService.uploadImage(img.base64);
    console.log(res);
  };

  renderInfo = () => {
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
          <Avatar
            source={{
              uri: avatar ? avatar : undefined
            }}
            title={firstName[0]}
            size={themeVariables.profile_avatar_size}
            rounded={true}
            containerStyle={{ borderWidth: 5, borderColor: 'white' }}
            showEditButton={true}
            onEditPress={this.handleImagePicker}
          />
        </View>
        <View
          style={{
            paddingTop:
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
          <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Skill</Text>
          <Icon name={'md-create'} type={'ionicon'} />
        </View>
        <View style={{ padding: themeVariables.spacing_md }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {[{ id: '1', name: 'test' }].map((s: ISkill, i: number) => (
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
          <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Saved job</Text>
          {/*<Icon name={'md-create'} type={'ionicon'} />*/}
        </View>
        <View style={{ padding: themeVariables.spacing_md }} />
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={{ backgroundColor: themeVariables.fill_base_color }}>
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
