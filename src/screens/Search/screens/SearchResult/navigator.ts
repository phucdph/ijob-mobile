export default {
  SearchResult: {
    getScreen: () => require('./SearchResultContainer').default
  },
  ...require('./screens/SalaryRange/navigator').default
};
