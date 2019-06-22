export default {
  Search: {
    getScreen: () => require('./SearchContainer').default
  },
  ...require('./screens/SearchResult/navigator').default
};
