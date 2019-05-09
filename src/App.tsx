import * as React from 'react';
import { Provider } from 'react-redux';
import AppNavigation from './AppNavigation';
import { store, persistor } from './store';
import { StatusBar } from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { PersistGate } from 'redux-persist/integration/react';
import { AppLoading } from 'expo';
import { themeVariables } from 'themes/themeVariables';

interface IProps {}

interface IState {}

class App extends React.Component<IProps, IState> {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<AppLoading/>} persistor={persistor}>
          <StatusBar hidden={false} barStyle={'light-content'} backgroundColor={themeVariables.primary_color}/>
          <ActionSheetProvider>
            <AppNavigation />
          </ActionSheetProvider>
      </PersistGate>
      </Provider>
    );
  }
}

export default App;
