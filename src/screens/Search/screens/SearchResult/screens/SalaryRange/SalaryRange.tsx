import React, { Component } from 'react';
import { themeVariables } from 'themes/themeVariables';
import { Keyboard, View, Text } from 'react-native';
import {
  NavigationInjectedProps,
  NavigationScreenConfigProps
} from 'react-navigation';
import HeaderIconButton from 'components/HeaderIconButton';
import navigationService from 'services/navigationService';
import HeaderTitle from 'components/HeaderTitle';
import { noop } from 'lodash';
import { Formik, FormikProps } from 'formik';
import FloatingInput from 'components/FloatingInput';
import WhiteSpace from 'components/base/WhiteSpace';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  max: Yup.number()
    .integer('Salary must be integer number')
    .min(0, 'Salary must be above 0').notRequired()
  ,
  min: Yup.number()
    .integer('Salary must be integer number')
    .min(0, 'Salary must be above 0').notRequired()
});

interface IFormValues {
  max: string;
  min: string;
}

interface IProps extends NavigationInjectedProps {}

class SalaryRange extends Component<IProps> {
  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    const onDone = navigation.getParam('handleSubmit', noop);
    return {
      headerLeft: (
        <HeaderIconButton
          name={'ios-close'}
          type={'ionicon'}
          onPress={navigationService.goBack}
        />
      ),
      headerTitle: <HeaderTitle title={'Salary'} />,
      headerRight: (
        <HeaderIconButton
          name={'ios-checkmark'}
          type={'ionicon'}
          onPress={onDone}
        />
      )
    };
  };

  constructor(props: IProps) {
    super(props);
    const { max = '', min = '' } = this.props.navigation.getParam('value', {});
    this.initialValues = {
      max: max.toString(),
      min: min.toString(),
    }
  }


  initialValues: IFormValues;

  onChange = this.props.navigation.getParam('onChange', noop);
  private submitForm: any;

  componentDidMount() {
    this.props.navigation.setParams({
      handleSubmit: this.submitForm
    });
  }

  handleSubmit = (values: IFormValues) => {
    Keyboard.dismiss();
    this.props.navigation.goBack();
    this.onChange(values);
  };

  renderFormComponent = ({
    errors,
    touched,
    values,
    handleChange,
    handleSubmit,
    handleBlur
  }: FormikProps<IFormValues>) => {
    const { max, min } = values;
    if (!this.submitForm) {
      this.submitForm = handleSubmit;
    }
    return (
      <>
        <FloatingInput
          label={'Min'}
          iconName={'ios-checkmark'}
          error={touched.min ? errors.min : ''}
          value={min}
          onChangeText={handleChange('min')}
          onBlur={handleBlur('min')}
          autoCorrect={false}
          keyboardType={'number-pad'}
        />
        <WhiteSpace />
        <FloatingInput
          label={'Max'}
          iconName={'ios-checkmark'}
          error={touched.max ? errors.max : ''}
          value={max}
          onChangeText={handleChange('max')}
          onBlur={handleBlur('max')}
          autoCorrect={false}
          keyboardType={'number-pad'}
        />
      </>
    );
  };

  render() {
    return (
      <View
        style={{ flex: 1, backgroundColor: 'white', padding: themeVariables.spacing_md }}
      >
        <Formik
          onSubmit={this.handleSubmit}
          initialValues={this.initialValues}
          validationSchema={validationSchema}
          render={this.renderFormComponent}
        />
      </View>
    );
  }
}

export default SalaryRange;
