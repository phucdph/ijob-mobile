export default {
  ListOfSkill: {
    getScreen: () => require('./ListOfSkillContainer').default
  },
  ...require('./screens/SearchSkillSelect/navigator').default,
};
