import * as React from 'react';
import { Provider } from 'react-redux';
import AppNavigation from './AppNavigation';
import { store, persistor } from './store';
import { StatusBar } from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { PersistGate } from 'redux-persist/integration/react';
import { AppLoading, Notifications } from 'expo';
import { themeVariables } from 'themes/themeVariables';
import { ThemeProvider } from 'react-native-elements';


interface IProps {}

interface IState {}

const theme = {
  Button: {
    titleStyle: {
      color: themeVariables.primary_color,
    },
  }
};

class App extends React.Component<IProps, IState> {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<AppLoading />} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <>
              <StatusBar
                hidden={false}
                barStyle={'light-content'}
                backgroundColor={themeVariables.primary_color}
              />
              <ActionSheetProvider>
                <AppNavigation />
              </ActionSheetProvider>
            </>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
