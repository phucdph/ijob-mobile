import * as React from 'react';
import { Provider } from 'react-redux';
import AppNavigation from './AppNavigation';
import { store, persistor } from './store';
import { noop } from 'lodash';
import { StatusBar } from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { PersistGate } from 'redux-persist/integration/react';
import { AppLoading } from 'expo';

interface IProps {}

interface IState {
  isReady: boolean;
}

class App extends React.Component<IProps, IState> {
  unsubscribeStore: () => void = noop;
  constructor(props: any) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  componentWillMount() {
    store.subscribe(() => {
      this.setState({ isReady: true });
    });
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<AppLoading/>} persistor={persistor}>
          {/*<StatusBar hidden={false} barStyle={'light-content'} />*/}
          <ActionSheetProvider>
            <AppNavigation />
          </ActionSheetProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
