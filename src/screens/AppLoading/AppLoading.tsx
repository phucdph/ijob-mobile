import React, { Component } from 'react';
import { AppLoading as EXPAppLoading, SplashScreen } from 'expo';
import { Asset } from 'expo-asset'
import { NavigationInjectedProps } from 'react-navigation';
import { authService } from '../Auth/services/authService';
import { storeHolder } from '../../store';
import { getUserProfileSuccess } from '../Profile/actions';
import { Image, NetInfo, View } from 'react-native';
import { setUserType } from '../../actions';
import { UserType } from '../../state';
import { themeVariables } from 'themes/themeVariables';

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

interface IState {
  isReady: boolean;
}
class AppLoading extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { isReady: false };
    this.bootstrapApp();
    SplashScreen.preventAutoHide(); // Instruct SplashScreen not to hide yet
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
      if (auth && auth.token) {
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
      } else {
        navigation.navigate('Auth');
      }
    } catch (e) {
      authService.clearPresistAuth();
      navigation.navigate('Auth');
    }
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('../../../assets/default/default_cover.jpg'),
      require('../../../assets/splash.png')
    ]);
    await Promise.all([...imageAssets]);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: themeVariables.primary_color }}>
        <Image
          source={require('../../../assets/splash.png')}
          style={{
            flex: 1,
            resizeMode: 'contain',
            width: undefined,
            height: undefined
          }}
          onLoadEnd={() => {
            SplashScreen.hide();
          }}
          fadeDuration={0}
        />
      </View>
    );
  }
}

export default AppLoading;
