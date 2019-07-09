import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { IComment } from '../Rating/services/typings';
import { Button, Input, ListItem, Rating } from 'react-native-elements';
import WhiteSpace from 'components/base/WhiteSpace';
import Avatar from 'components/base/Avatar';
import { themeVariables } from 'themes/themeVariables';
import { IUser } from '../../../Profile/services/typings';
import { UserType } from '../../../../state';
import memoize from 'memoize-one';
import { get } from 'lodash';

interface IProps {
  comments: IComment[];
  id: string;
  onComment: (req: { id: string; comment: IComment }) => void;
  profile: IUser;
  userType: UserType;
}

interface IState {
  rating: number;
  content: string;
}

class Review extends Component<IProps, IState> {
  state = {
    rating: 0,
    content: ''
  };

  isReviewed = memoize((comments: IComment[], id: string) => {
    return comments.findIndex((comment: IComment) => get(comment, 'source.id') === id) >= 0;
  });

  renderCommentItem = ({ item, index }: { item: IComment; index: number }) => {
    const { source, content, rating } = item;
    return (
      <ListItem
        leftAvatar={
          <Avatar
            source={{
              uri: source
                ? source.avatar
                : 'https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg'
            }}
          />
        }
        title={source ? `${source.firstName} ${source.lastName}` : 'Anonymous'}
        subtitle={
          <View style={{ alignItems: 'flex-start' }}>
            <WhiteSpace size={'sm'} />
            <Rating readonly={true} startingValue={rating} imageSize={14} />
            <WhiteSpace size={'sm'} />
            <Text>{content}</Text>
          </View>
        }
        containerStyle={{ alignItems: 'flex-start' }}
      />
    );
  };

  handleRatingChange = (rating: number) => {
    this.setState({ rating });
  };

  handleContentChange = (content: string) => {
    this.setState({ content });
  };

  handlePost = () => {
    const { content, rating } = this.state;
    const { onComment, id, profile, userType } = this.props;
    const { id: userId, firstName, lastName, avatar } = profile;
    onComment({
      id,
      comment: {
        content,
        rating,
        source:
          userType === UserType.GUEST
            ? null
            : {
                id: userId,
                firstName,
                lastName,
                avatar
              }
      }
    });
    this.setState({
      content: '',
      rating: 0,
    });
  };

  renderCommentInput = () => {
    const { content, rating } = this.state;
    const { userType, comments, profile } = this.props;
    if (userType === UserType.GUEST || this.isReviewed(comments, profile.id)) return null;
    return (
      <View
        style={{
          alignItems: 'flex-start',
          backgroundColor: 'white',
          paddingVertical: themeVariables.spacing_md,
          paddingHorizontal: themeVariables.spacing_lg
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>Write a review</Text>
        <WhiteSpace size={'md'} />
        <Rating
          startingValue={rating}
          onFinishRating={this.handleRatingChange}
          fractions={0}
          imageSize={18}
        />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Input
              value={content}
              onChangeText={this.handleContentChange}
              placeholder={`What're you thing about this comany?`}
              containerStyle={{ paddingHorizontal: 0 }}
              autoCorrect={false}
            />
          </View>
          <Button
            style={{ width: 70 }}
            title="Post"
            type="clear"
            onPress={this.handlePost}
            disabled={!content || !rating}
          />
        </View>
      </View>
    );
  };

  render() {
    const { comments } = this.props;
    return (
      <View>
        {this.renderCommentInput()}
        <FlatList
          data={comments}
          renderItem={this.renderCommentItem}
          keyExtractor={(item: any, index: number) => `${item.id}_${index}`}
        />
      </View>
    );
  }
}

export default Review;
