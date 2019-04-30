import * as React from 'react';
import { Input, InputProps } from 'react-native-elements';

interface IProps extends InputProps {}

class TextInput extends React.Component<IProps> {
  render() {
    return (
      <Input
        leftIconContainerStyle={{
          paddingRight: 14,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        inputContainerStyle={{ borderWidth: 1, borderRadius: 50 }}
        containerStyle={{ paddingHorizontal: 0 }}
        errorStyle={{ fontSize: 14 }}
        {...this.props}
      />
    );
  }
}

export default TextInput;
