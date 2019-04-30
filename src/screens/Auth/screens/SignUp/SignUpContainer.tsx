import * as React from 'react';
import SignUp from './SignUp';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { signUp } from './actions';
import { actionSelector, errorSelector } from './selectors';
import { ErrorState } from 'services/models/Error';
const memoizeOne = require('memoize-one');

interface IProps {
  dispatchSignUp: (req: ISignUpRequest) => void;
  action: string;
  error: ErrorState;
}

class SignUpContainer extends React.Component<IProps> {
  static navigationOptions = SignUp.navigationOptions;

  isLoading = memoizeOne((action: string) => signUp.is(action));

  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { dispatchSignUp, action } = this.props;
    return (
      <SignUp onSignUp={dispatchSignUp} isLoading={this.isLoading(action)} />
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    action: actionSelector(state),
    error: errorSelector(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    dispatchSignUp: (req: ISignUpRequest) => dispatch(signUp(req))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpContainer);
