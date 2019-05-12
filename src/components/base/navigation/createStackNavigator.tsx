import {
  StackNavigatorConfig,
  NavigationScreenRouteConfig,
  createStackNavigator,
  StackViewTransitionConfigs
} from 'react-navigation';
import { merge, get, last } from 'lodash';
import { isIOS } from 'utils/platform';
import { Easing, Animated } from 'react-native';
import { themeVariables } from 'themes/themeVariables';
import HeaderBackButton from 'components/HeaderBackButton';
import * as React from 'react';
import { Constants } from 'expo';

export default function createAllScreenStackNavigator(
  route: NavigationScreenRouteConfig,
  config: StackNavigatorConfig
) {
  return createStackNavigator(
    route,
    merge(
      {
        headerTransitionPreset: 'fade-in-place',
        headerMode: isIOS ? 'float' : 'screen',
        transitionConfig: (
          transitionProps: any,
          prevTransitionProps: any,
          isModal: any
        ) => {
          // @ts-ignore
          if (
            last(get(transitionProps, 'scenes')).route.routeName === 'Search'
          ) {
            return {
              transitionSpec: {
                duration: 5,
                timing: Animated.timing,
                easing: Easing.step0
              }
            };
          }

          return StackViewTransitionConfigs.defaultTransitionConfig;
        },
        headerLayoutPreset: 'center',
        defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: themeVariables.primary_color,
            elevation: 0,
            height: 44
          },
          headerBackImage: <HeaderBackButton />,
          headerBackTitle: null,
          headerBackTitleStyle: {
            color: 'white'
          },
          headerTitleStyle: {
            color: 'white'
          },
          headerForceInset: {
            top: isIOS ? Constants.statusBarHeight : 'never'
          }
        },
        headerTitleInterpolator: sceneProps => {
          const { layout, position, scene } = sceneProps;
          const { index } = scene;

          return {
            opacity: position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0, 1, 0]
            }),
            transform: [
              {
                translateX: position.interpolate({
                  inputRange: [index - 1, index, index + 1],
                  outputRange: [-50, 0, 50]
                })
              }
            ]
          };
        }
      },
      config
    )
  );
}
