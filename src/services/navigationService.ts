import {
  NavigationScreenProp,
  NavigationAction,
  NavigationActions,
  NavigationNavigateActionPayload
} from 'react-navigation';

let navigator: NavigationScreenProp<any>;

function setTopLevelNavigator(navigatorRef: any) {
  navigator = navigatorRef;
}

function navigate(options: NavigationNavigateActionPayload) {
  if (navigator) {
    navigator.dispatch(NavigationActions.navigate(options));
  }
}

function dispatch(action: NavigationAction) {
  if (navigator) {
    navigator.dispatch(action);
  }
}

function goBack() {
  if (navigator) {
    navigator.dispatch(NavigationActions.back());
  }
}

export default {
  dispatch,
  goBack,
  navigate,
  setTopLevelNavigator
};
