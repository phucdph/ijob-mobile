import React, { Component } from 'react';
import { AppLoading as EXPAppLoading, Asset } from 'expo';
import { NavigationInjectedProps } from 'react-navigation';
import { authService } from '../Auth/services/authService';
import { storeHolder } from '../../store';
import { getUserProfileSuccess } from '../Profile/actions';
import { Image, NetInfo } from 'react-native';
import { setUserType } from '../../actions';
import { UserType } from '../../state';

function cacheImages(images: any[]) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

interface IProps extends NavigationInjectedProps {}

class AppLoading extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.bootstrapApp();
  }

  bootstrapApp = async () => {
    const { navigation } = this.props;
    try {
      const connectionInfo = await NetInfo.getConnectionInfo();
      if (connectionInfo.type === 'none' || connectionInfo.type === 'unknown') {
        navigation.navigate('App');
        return;
      }
      await this._loadAssetsAsync();
      const auth = await authService.getPresistedAuth();
      const res = await authService.checkTokenValid();
      if (res.profile && auth.token) {
        storeHolder
          .getStore()
          .dispatch(
            getUserProfileSuccess({ ...res.profile, token: auth.token })
          );
        await authService.presistAuth({ ...res.profile, token: auth.token });
        storeHolder.getStore().dispatch(setUserType(UserType.USER));
        navigation.navigate('App');
      } else {
        authService.clearPresistAuth();
        navigation.navigate('Auth');
      }
    } catch (e) {
      authService.clearPresistAuth();
      navigation.navigate('Auth');
    }
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('../../../assets/default/default_cover.jpg')
    ]);
    await Promise.all([...imageAssets]);
  }

  render() {
    return (
      <EXPAppLoading/>
    );
  }
}

export default AppLoading;
