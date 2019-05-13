import * as React from 'react';
import { View, Keyboard, Text } from 'react-native';
import { Constants } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { themeVariables } from 'themes/themeVariables';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import TextInput from 'components/base/TextInput';
import WhiteSpace from 'components/base/WhiteSpace';
import Button from 'components/base/Button';
import Link from 'components/base/Link';
import navigationService from 'services/navigationService';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter valid email')
    .required('Please enter your email'),
  password: Yup.string()
    .min(6, 'Password must be between 6 and 20')
    .max(20, 'Password must be between 6 and 20')
    .required('Please enter your password')
});

interface IProps {
  isLoading?: boolean;
  onSignIn: (req: ISignInRequest) => void;
  onUseAsGuest: () => void;
}

class SignIn extends React.Component<IProps> {
  static navigationOptions = {
    header: (
      <View
        style={{
          height: Constants.statusBarHeight,
          backgroundColor: themeVariables.primary_color
        }}
      />
    )
  };

  handleSubmit = (values: ISignInRequest) => {
    Keyboard.dismiss();
    const { onSignIn } = this.props;
    onSignIn(values);
  };

  renderFormComponent = ({
    errors,
    touched,
    values,
    handleChange,
    handleSubmit,
    handleBlur
  }: FormikProps<ISignInRequest>) => {
    const { email, password } = values;
    const { isLoading } = this.props;
    return (
      <>
        <TextInput
          placeholder="Email"
          leftIcon={{ type: 'ionicon', name: 'ios-person', color:themeVariables.accent_color }}
          errorMessage={touched.email ? errors.email : ''}
          value={email}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          autoCorrect={false}
          autoCapitalize={'none'}
          inputContainerStyle={{
            backgroundColor: 'white',
            borderWidth: 1,
          }}
          inputStyle={{ color: themeVariables.primary_text_color}}
        />
        <WhiteSpace />
        <TextInput
          placeholder="Password"
          leftIcon={{ type: 'ionicon', name: 'ios-lock', color:themeVariables.accent_color }}
          errorMessage={touched.password ? errors.password : ''}
          value={password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          autoCorrect={false}
          secureTextEntry={true}
          autoCapitalize={'none'}
          inputContainerStyle={{
            backgroundColor: 'white',
            borderWidth: 1,
          }}
          inputStyle={{ color: themeVariables.primary_text_color}}
        />
        <WhiteSpace />
        <Button
          loading={isLoading}
          title="SIGN IN"
          type="solid"
          style={{ width: '100%' }}
          onPress={handleSubmit as any}
        />
      </>
    );
  };

  handleUseAsGuestPress = () =>  {
    this.props.onUseAsGuest();
    navigationService.navigate({ routeName: 'NewFeed'});
  };

  render() {
    return (
      <KeyboardAwareScrollView
        style={{
          flex: 1,
          backgroundColor: 'white'
        }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
        keyboardShouldPersistTaps={'handled'}
      >
        <View style={{ height: 180, backgroundColor: themeVariables.primary_color, }} />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: themeVariables.spacing_lg,
            paddingTop: themeVariables.spacing_lg,
          }}
        >
          <Formik
            initialValues={{
              email: 'phuchoang2710@gmail.com',
              password: '123456'
            }}
            validationSchema={SignInSchema}
            onSubmit={this.handleSubmit}
            render={this.renderFormComponent}
          />
        </View>
        <WhiteSpace />
        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
          <Text>Don't have account? </Text>
          <Link to={{ routeName: 'SignUp' }}>SIGN UP</Link>
        </View>
        <WhiteSpace />
        <View style={{
          padding: themeVariables.spacing_lg
        }}>
          <Button
            onPress={this.handleUseAsGuestPress}
            title="USE AS GUEST"
            type="outline"
            style={{ width: '100%' }}
            buttonStyle={{
              borderColor: themeVariables.primary_color,
              borderWidth: 1
            }}
            titleStyle={{ color: themeVariables.primary_color}}
          />
        </View>

      </KeyboardAwareScrollView>
    );
  }
}

export default SignIn;
