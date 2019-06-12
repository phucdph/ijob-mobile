export default [
  ...require('./screens/SearchResult/sagas').default,
  ...require('./components/SearchHistory/sagas').default,
]
