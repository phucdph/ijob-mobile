import React, { Component } from 'react';
import Review from './Review';
import { connect } from 'react-redux';
import { ratingStateSelector } from '../Rating/selectors';
import { comment } from '../Rating/actions';
import { IComment } from '../Rating/services/typings';
import { currentProfileSelector } from '../../../Profile/selectors';
import { IUser } from '../../../Profile/services/typings';
import { userTypeSelector } from '../../../../selectors';
import { UserType } from '../../../../state';

interface IProps {
  id: string;
  comments: IComment[];
  dispatchComment: (req: any) => void;
  profile: IUser;
  userType: UserType;
};

class ReviewContainer extends Component<IProps> {


  render() {
    const { comments, id, dispatchComment, profile, userType } = this.props;
    return (
      <Review id={id} comments={comments} onComment={dispatchComment} profile={profile} userType={userType}/>
    );
  }
}

const mapStateToProps = (state: any, props: IProps) => {
  const{id}=props;
  return {
    comments: ratingStateSelector(state, { id }).data.comments,
    profile: currentProfileSelector(state),
    userType: userTypeSelector(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchComment: (req: any) => dispatch(comment(req))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewContainer);
