import {
  StackNavigatorConfig,
  NavigationScreenRouteConfig,
  createStackNavigator, StackViewTransitionConfigs
} from 'react-navigation';
import { merge, get, last } from 'lodash';
import { isIOS } from 'utils/platform';
import { Easing, Animated } from 'react-native';
import { themeVariables } from 'themes/themeVariables';
import HeaderBackButton from 'components/HeaderBackButton';
import * as React from 'react';

export default function createAllScreenStackNavigator(
  route: NavigationScreenRouteConfig,
  config: StackNavigatorConfig
) {
  return createStackNavigator(
    route,
    merge(
      {
        headerTransitionPreset: 'fade-in-place',
        headerMode: isIOS? 'float' : 'screen',
        transitionConfig: (transitionProps: any, prevTransitionProps: any, isModal: any) => {
          // @ts-ignore
          if (last(get(transitionProps, 'scenes')).route.routeName === 'Search') {
            return {
              transitionSpec: {
                duration: 0,
                timing: Animated.timing,
                easing: Easing.step0,
              },
            };
          }

          return StackViewTransitionConfigs.defaultTransitionConfig;
        },
        defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: themeVariables.primary_color,
            elevation: 0,
          },
          headerBackImage: <HeaderBackButton/>,
          headerBackTitle: null,
          headerBackTitleStyle: {
            color: 'white',
          },
          headerTitleStyle: {
            color: 'white',
          },
        }
      },
      config
    )
  );
}
