import { createAction, createAsyncAction } from 'utils/redux';

export const { searchSkills, searchSkillsSuccess, searchSkillsFail } = createAsyncAction(
  'searchSkills',
  'SEARCH_SKILLS'
);

export const { searchNextSkills, searchNextSkillsSuccess, searchNextSkillsFail } = createAsyncAction(
  'searchNextSkills',
  'SEARCH_NEXT_SKILLS'
);

export const refreshSearchSkills = createAction('REFRESH_SEARCH_SKILLS');

export const resetSearchSkills = createAction('RESET_SEARCH_SKILLS');

