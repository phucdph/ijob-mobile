import * as React from 'react';
import { Input, SearchBarDefault } from 'react-native-elements';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import navigationService from 'services/navigationService';
import { Header } from 'react-navigation';
import { Constants } from 'expo';
import { themeVariables } from 'themes/themeVariables';

interface IProps extends SearchBarDefault {
  cancelButton?: boolean;
}

class HeaderSearchBarInput extends React.Component<IProps> {
  static defaultProps = {
    size: 16,
    cancelButton: true
  };

  handleCancelPress = () => {
    navigationService.goBack();
  };

  render() {
    const { onChangeText, containerStyle, cancelButton, inputContainerStyle, ...rest } = this.props;
    return (
        <View style={[styles.container, containerStyle]}>
          <Input
            autoFocus={true}
            autoCapitalize={'none'}
            autoCorrect={false}
            inputStyle={styles.input}
            containerStyle={{
              paddingHorizontal: 0,
              width: cancelButton? Dimensions.get('window').width - 75 : '100%'
            }}
            inputContainerStyle={[styles.inputContainer, {
              marginRight: cancelButton ? 0 : 8,
            }, inputContainerStyle]}
            leftIconContainerStyle={styles.leftIconContainerStyle}
            leftIcon={<Ionicons
              name={'ios-search'}
              style={{ fontSize: 20, color: '#7d7d7d' }}
            />}
            onChangeText={onChangeText}
            clearButtonMode={'always'}
            {...rest}
          />
         {cancelButton && <TouchableOpacity
            onPress={this.handleCancelPress}
          >
            <View style={styles.cancelButtonContainer}>
              <Text style={styles.buttonTextStyle}>Cancel</Text>
            </View>
          </TouchableOpacity>}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeVariables.primary_color,
    height: Header.HEIGHT - Constants.statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
  },
  input: {
    marginLeft: 6,
    fontSize: 14,
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: 'white',
    borderRadius: 9,
    height: 30,
    marginLeft: 8,
    marginRight: 8,
  },
  rightIconContainerStyle: {
    marginRight: 8
  },
  leftIconContainerStyle: {
    marginLeft: 8
  },
  cancelButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 8,
    fontSize: 18,
  },
});

export default HeaderSearchBarInput;
