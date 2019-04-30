export default {
  NewFeed: {
    getScreen: () => require('./NewFeedContainer').default
  },
  ...require('./screens/FeedDetail/navigator').default
};
