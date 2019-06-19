import React, { Component } from 'react';
import HeaderTitle from 'components/HeaderTitle';
import HeaderButton from 'components/HeaderButton';
import {
  NavigationInjectedProps,
  NavigationScreenConfigProps,
  NavigationScreenProps,
  withNavigation
} from 'react-navigation';
import { View, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';
import navigationService from 'services/navigationService';
import { themeVariables } from 'themes/themeVariables';
import FloatingInput from 'components/FloatingInput';
import WhiteSpace from 'components/base/WhiteSpace';
import { IUser } from '../../services/typings';
import { Formik, FormikProps } from 'formik';
import { noop, get } from 'lodash';
import { ILocation } from 'components/Locations/services/typings';
import { updateUserProfileSuccess } from '../../actions';
import Spinner from 'components/base/Spinner';
import * as Yup from 'yup';
import FloatingLabel from 'components/FloatingLabel';

interface IProps extends NavigationScreenProps {
  isLoading?: boolean;
  onUpdate: (req: Partial<IUser>) => void;
  action?: string;
  profile: IUser;
}

interface IFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

interface IState {
  location: ILocation;
  disabled: boolean;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please enter your last name')
});

class EditInfo extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    const handleSubmit = navigation.getParam('handleSubmit', noop);
    return {
      headerTitle: <HeaderTitle title={'Info'} />,
      headerLeft: (
        <HeaderButton name={'Cancel'} onPress={navigationService.goBack} />
      ),
      headerRight: <HeaderButton name={'Save'} onPress={handleSubmit} />
    };
  };
  private submitForm: any;

  constructor(props: IProps) {
    super(props);
    const location = get(props, 'profile.location', {});
    this.state = {
      location,
      disabled: true
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handleSubmit: this.submitForm
    });
  }

  componentDidUpdate(
    prevProps: Readonly<IProps>,
  ): void {
    const { action, navigation } = this.props;
    if (prevProps.action !== action) {
      if (updateUserProfileSuccess.is(action)) {
        navigation.goBack();
      }
    }
  }

  handleSelectLocation = (location: ILocation) => {
    this.setState({ location: {...location} });
  };

  handleLocationInputPress = () => {
    this.props.navigation.navigate({
      routeName: 'LocationSelectModal',
      params: {
        onSelectLocation: this.handleSelectLocation
      }
    });
  };

  renderFormComponent = ({
    errors,
    touched,
    values,
    handleChange,
    handleSubmit,
    handleBlur
  }: FormikProps<IFormValues>) => {
    const { firstName, lastName, email } = values;
    if (!this.submitForm) {
      this.submitForm = handleSubmit;
    }
    const location = get(this.state, 'location.name', '');
    return (
      <>
        <FloatingInput
          label={'Firstname'}
          iconName={'ios-person'}
          error={touched.firstName ? errors.firstName : ''}
          value={firstName}
          onChangeText={handleChange('firstName')}
          onBlur={handleBlur('firstName')}
          autoCorrect={false}
          autoCapitalize={'words'}
        />
        <WhiteSpace />
        <FloatingInput
          label={'Lastname'}
          iconName={'ios-person-add'}
          error={touched.lastName ? errors.lastName : ''}
          value={lastName}
          onChangeText={handleChange('lastName')}
          onBlur={handleBlur('lastName')}
          autoCorrect={false}
          autoCapitalize={'words'}
        />
        <WhiteSpace />
        <FloatingInput
          label={'Email'}
          iconName={'ios-mail'}
          editable={false}
          value={email}
        />
        <FloatingLabel
          label={'Location'}
          onPress={this.handleLocationInputPress}
          value={location}
        />
      </>
    );
  };

  handleSubmit = (values: IFormValues) => {
    Keyboard.dismiss();
    const { location } = this.state;
    const { onUpdate } = this.props;
    onUpdate({ ...values, location });
  };

  render() {
    const { profile, isLoading } = this.props;
    const { firstName, lastName, email } = profile;
    return (
      <Spinner isModal={true} loading={isLoading} overlay={0.3}>
        <View style={{ flex: 1, padding: themeVariables.spacing_md }}>
          <Formik
            onSubmit={this.handleSubmit}
            initialValues={{ firstName, lastName, email }}
            render={this.renderFormComponent}
            validationSchema={validationSchema}
          />
        </View>
      </Spinner>
    );
  }
}

export default withNavigation(EditInfo as any) as any;
