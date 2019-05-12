export default {
  Profile: {
    getScreen: () => require('./ProfileContainer').default
  },
  ...require('./screens/ListOfSkill/navigator').default,
  ...require('./screens/EditInfo/navigator').default,
};
