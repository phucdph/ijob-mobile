import { createAction, createAsyncAction } from 'utils/redux';

export const { searchSkills, searchSkillsSuccess, searchsSkillFail } = createAsyncAction(
  'searchSkills',
  'SEARCH_SKILLS'
);

export const { searchNextSkills, searchNextSkillsSuccess, searchsNextSkillFail } = createAsyncAction(
  'searchNextSkills',
  'SEARCH_NEXT_SKILLS'
);

export const refreshSearchSkills = createAction('REFRESH_SEARCH_SKILLS');
