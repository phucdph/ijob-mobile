import React from 'react';
import { userTypeSelector } from '../../selectors';
import { connect } from 'react-redux';
import { UserType } from '../../state';

interface IProps {
  GuestViewComponent?: React.ReactElement<any, any> | React.ReactNode;
  userType?: UserType;
}

class Authorize extends React.Component<IProps> {
  static defaultProps = {
    GuestViewComponent: null
  };

  render() {
    const { userType, children, GuestViewComponent} = this.props;
    if (userType === UserType.GUEST) {
      // @ts-ignore
      return <GuestViewComponent/>;
    }
    return children;
  }
}

const mapStateToProps = (state: any) => {
  return {
    userType: userTypeSelector(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(Authorize as any) as React.ComponentClass<IProps>;
