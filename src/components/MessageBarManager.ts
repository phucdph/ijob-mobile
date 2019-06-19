import { TextStyle, ViewStyle } from 'react-native';
import { Constants } from 'expo';
import { themeVariables } from 'themes/themeVariables';

const RNMessageBarManager = require('react-native-message-bar')
  .MessageBarManager;

interface IMessageBarOption {
  title?: string;
  message: string | any;
  avatar?: string;
  alertType: 'success' | 'info' | 'warning' | 'error';
  stylesheetInfo?: ViewStyle;
  stylesheetSuccess?: ViewStyle;
  stylesheetWarning?: ViewStyle;
  stylesheetError?: ViewStyle;
  messageStyle?: TextStyle;
  titleStyle?: TextStyle;
  viewTopInset?: number;
  onTapped?: (res: any) => void;
}

class MessageBarManager {
  static register(messageBar: any) {
    RNMessageBarManager.registerMessageBar(messageBar);
  }

  static unregister() {
    RNMessageBarManager.unregisterMessageBar();
  }

  static alert(options: IMessageBarOption) {
    RNMessageBarManager.showAlert(options);
  }

  static notify(notification: any) {
    const { body } = notification;
    RNMessageBarManager.showAlert({
      message: body,
      alertType: 'info',
      stylesheetInfo: {
        backgroundColor: 'white'
      },
      messageStyle: {
        color: themeVariables.primary_text_color,
        fontSize: 16,
      },
      viewTopInset: Constants.statusBarHeight
    });
  }
}

export default MessageBarManager;
