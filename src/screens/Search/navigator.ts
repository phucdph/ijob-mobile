export default {
  Search: {
    getScreen: () => require('./Search').default
  },
  ...require('./screens/SearchResult/navigator').default
};
