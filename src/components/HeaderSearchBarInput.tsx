import * as React from 'react';
import { Input, SearchBarDefault } from 'react-native-elements';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import navigationService from 'services/navigationService';
import { Header } from 'react-navigation';
import { Constants } from 'expo';
import { themeVariables } from 'themes/themeVariables';

interface IProps extends SearchBarDefault {}

class HeaderSearchBarInput extends React.Component<IProps> {
  static defaultProps = {
    size: 16
  };

  handleCancelPress = () => {
    navigationService.goBack();
  };

  render() {
    const { onChangeText } = this.props;
    return (
        <View style={styles.container}>
          <Input
            autoFocus={true}
            autoCapitalize={'none'}
            autoCorrect={false}
            inputStyle={styles.input}
            containerStyle={{
              paddingHorizontal: 0,
              width: Dimensions.get('window').width - 75
            }}
            inputContainerStyle={styles.inputContainer}
            leftIconContainerStyle={styles.leftIconContainerStyle}
            leftIcon={<Ionicons
              name={'ios-search'}
              style={{ fontSize: 20, color: '#7d7d7d' }}
            />}
            onChangeText={onChangeText}
            clearButtonMode={'always'}
          />
          <TouchableOpacity
            onPress={this.handleCancelPress}
          >
            <View style={styles.cancelButtonContainer}>
              <Text style={styles.buttonTextStyle}>Cancel</Text>
            </View>
          </TouchableOpacity>
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
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: 'white',
    borderRadius: 9,
    height: 30,
    marginLeft: 8,
    // marginRight: 8,
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
