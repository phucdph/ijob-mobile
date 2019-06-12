import * as React from 'react';
import { View, Keyboard } from 'react-native';
import { themeVariables } from 'themes/themeVariables';
import WhiteSpace from 'components/base/WhiteSpace';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Constants from 'expo-constants'
import TextInput from 'components/base/TextInput';
import Button from 'components/base/Button';

interface IFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialFormValues: IFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please enter your last name'),
  email: Yup.string()
    .email('Please enter valid email')
    .required('Please enter your email'),
  password: Yup.string()
    .min(6, 'Password must be between 6 and 20')
    .max(20, 'Password must be between 6 and 20')
    .required('Please enter your password'),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('password'), null],
      'Confirm password must be the same with password'
    )
    .required('Please enter your confirm Password')
});

interface IProps {
  onSignUp: (req: ISignUpRequest) => void;
  isLoading?: boolean;
}

class SignUp extends React.Component<IProps> {
  static navigationOptions = {
    headerTitle: 'Signup'
  };

  static defaultProps: Partial<IProps> = {
    isLoading: false
  };

  handleSubmit = (values: IFormValues) => {
    Keyboard.dismiss();
    const { onSignUp } = this.props;
    onSignUp(values);
  };

  renderFormComponent = ({
    errors,
    touched,
    values,
    handleChange,
    handleSubmit,
    handleBlur
  }: FormikProps<IFormValues>) => {
    const { isLoading } = this.props;
    const { firstName, lastName, password, confirmPassword, email } = values;
    return (
      <>
        <TextInput
          placeholder="Firstname"
          leftIcon={{ type: 'ionicon', name: 'ios-person', color:themeVariables.accent_color }}
          errorMessage={touched.firstName ? errors.firstName : ''}
          value={firstName}
          onChangeText={handleChange('firstName')}
          onBlur={handleBlur('firstName')}
          autoCorrect={false}
          autoCapitalize={'words'}
          inputContainerStyle={{
            backgroundColor: 'white',
            borderWidth: 1,
          }}
          inputStyle={{ color: themeVariables.primary_text_color}}
        />
        <WhiteSpace />
        <TextInput
          placeholder="Lastname"
          leftIcon={{ type: 'ionicon', name: 'ios-person-add', color:themeVariables.accent_color }}
          errorMessage={touched.lastName ? errors.lastName : ''}
          value={lastName}
          onChangeText={handleChange('lastName')}
          onBlur={handleBlur('lastName')}
          autoCorrect={false}
          autoCapitalize={'words'}
          inputContainerStyle={{
            backgroundColor: 'white',
            borderWidth: 1,
          }}
          inputStyle={{ color: themeVariables.primary_text_color}}
        />
        <WhiteSpace />
        <TextInput
          placeholder="Email"
          leftIcon={{ type: 'ionicon', name: 'ios-mail', color:themeVariables.accent_color }}
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
          secureTextEntry={true}
          leftIcon={{ type: 'ionicon', name: 'ios-lock', color:themeVariables.accent_color }}
          errorMessage={touched.password ? errors.password : ''}
          value={password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          autoCorrect={false}
          inputContainerStyle={{
            backgroundColor: 'white',
            borderWidth: 1,
          }}
          inputStyle={{ color: themeVariables.primary_text_color}}
        />
        <WhiteSpace />
        <TextInput
          placeholder="Confirm password"
          secureTextEntry={true}
          leftIcon={{ type: 'ionicon', name: 'ios-lock', color:themeVariables.accent_color }}
          errorMessage={touched.confirmPassword ? errors.confirmPassword : ''}
          value={confirmPassword}
          onChangeText={handleChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
          autoCorrect={false}
          inputContainerStyle={{
            backgroundColor: 'white',
            borderWidth: 1,
          }}
          inputStyle={{ color: themeVariables.primary_text_color}}
        />
        <WhiteSpace />
        <Button
          loading={isLoading}
          title="SIGN UP"
          type="solid"
          style={{ width: '100%' }}
          onPress={handleSubmit as any}
        />
      </>
    );
  };

  render() {
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: 'white' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
        keyboardShouldPersistTaps={'handled'}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: themeVariables.spacing_lg,
            paddingTop: themeVariables.spacing_lg,
          }}
        >
          <Formik
            initialValues={initialFormValues}
            validationSchema={SignupSchema}
            onSubmit={this.handleSubmit}
            render={this.renderFormComponent}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default SignUp;
