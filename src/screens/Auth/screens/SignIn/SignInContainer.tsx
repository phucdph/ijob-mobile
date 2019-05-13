import * as React from 'react';
import SignIn from './SignIn';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { actionSelector, errorSelector } from './selectors';
import { signIn } from './actions';
import { UserType } from '../../../../state';
import { setUserType } from '../../../../actions';
const memoizeOne = require('memoize-one');

interface IProps {
  action?: string;
  dispatchSignIn: (req: ISignInRequest) => void;
  dispatchSetUserType: (req: UserType) => void;
}

class SignInContainer extends React.Component<IProps> {
  static navigationOptions = SignIn.navigationOptions;

  isLoading = memoizeOne((action: string) => signIn.is(action));

  handleUseAsGuest = () => {
    this.props.dispatchSetUserType(UserType.GUEST);
  };

  render() {
    const { action, dispatchSignIn } = this.props;
    return (
      <SignIn
        onSignIn={dispatchSignIn}
        onUseAsGuest={this.handleUseAsGuest}
        isLoading={this.isLoading(action)}
      />
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
    dispatchSignIn: (req: ISignInRequest) => dispatch(signIn(req)),
    dispatchSetUserType: (req: UserType) => dispatch(setUserType(req))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInContainer);
