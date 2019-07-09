import { createReducers } from 'utils/redux';
import {
  ICompaniesState,
  initialState,
  stateContext,
  initialCompanyState
} from './state';
import {
  getCompany,
  refreshCompany,
  getCompanySuccess,
  getCompanyFail,
  followCompany,
  followCompanySuccess,
  followCompanyFail,
  unFollowCompany,
  unFollowCompanySuccess,
  unFollowCompanyFail
} from './actions';
import { Action } from 'services/typings';
import { ICompany } from './services/typings';
import { IError } from 'services/models/Error';
import { get, set } from 'lodash';
import { IPageableData } from 'services/models';
import { IJobDetail } from '../NewFeed/services/typings';
import { searchSuccess, searchNextSuccess } from '../Search/screens/SearchResult/actions';
import { ISearchCompany } from '../Search/screens/SearchResult/services/typings';
import { getJobDetailSuccess } from '../NewFeed/screens/FeedDetail/actions';
import { getUserProfileSuccess } from '../Profile/actions';
import { IUser } from '../Profile/services/typings';

const companyReducers = [
  {
    on: [getCompany, refreshCompany, followCompanySuccess, unFollowCompanySuccess],
    reducer: (state: ICompaniesState, action: Action<string>) => {
      const id = action.payload;
      if (!state[id]) {
        state[id] = initialCompanyState;
      }
      state[id].action = action.type;
    }
  },
  {
    on: followCompany,
    reducer: (state: ICompaniesState, action: Action<string>) => {
      const id = action.payload;
      if (!state[id]) {
        state[id] = initialCompanyState;
      }
      state[id].action = action.type;
      set(state, `${id}.data.follow`, true);
    }
  },
  {
    on: unFollowCompany,
    reducer: (state: ICompaniesState, action: Action<string>) => {
      const id = action.payload;
      if (!state[id]) {
        state[id] = initialCompanyState;
      }
      state[id].action = action.type;
      set(state, `${id}.data.follow`, false);
    }
  },
  {
    on: getCompanySuccess,
    reducer: (state: ICompaniesState, action: Action<ICompany>) => {
      const { id } = action.payload;
      state[id].action = action.type;
      state[id].data = action.payload;
    }
  },
  {
    on: [getCompanyFail,followCompanyFail, unFollowCompanyFail],
    reducer: (
      state: ICompaniesState,
      action: Action<{ id: string; error: IError }>
    ) => {
      const { id, error } = action.payload;
      state[id].error = error;
    }
  },
  // {
  //   on: [getJobsSuccess, getNextJobsSuccess],
  //   reducer: (state: ICompaniesState, action: Action<IPageableData<IJob>>) => {
  //     const { data = [] } = action.payload;
  //     for (const job of data) {
  //       const company = get(job, 'company');
  //       if (company.id) {
  //         if (!state[company.id]) {
  //           set(state, `${company.id}`, {
  //             ...initialCompanyState,
  //             data: job.company
  //           });
  //         }
  //       }
  //     }
  //   }
  // },
  {
    on: [searchSuccess, searchNextSuccess],
    reducer(
      state: ICompaniesState,
      action: Action<{
        companies: IPageableData<ISearchCompany>;
      }>
    ) {
      const { companies } = action.payload;
      if (companies) {
        for (const company of companies.data) {
          if (company.id) {
            if (!state[company.id]) {
              set(state, `${company.id}`, {
                ...initialCompanyState,
                data: company
              });
            }
          }
        }
      }
    }
  },
  {
    on: getJobDetailSuccess,
    reducer: (state: ICompaniesState, action: Action<IJobDetail>) => {
      const { company = { id: ''} } = action.payload;
      if (company.id) {
        if (!state[company.id]) {
          set(state, `${company.id}`, {
            ...initialCompanyState,
            data: company
          });
        }
      }
    }
  },
  {
    on: getUserProfileSuccess,
    reducer: (state: ICompaniesState, action: Action<IUser>) => {
      const { followCompany: followedCompanies = [] as any } = action.payload;
      for (const company of followedCompanies) {
        if (company.id) {
            set(state, `${company.id}`, {
              ...initialCompanyState,
              data: company
            });
        }
      }
    }
  },
];

export default {
  ...createReducers(stateContext, companyReducers, initialState),
  ...require('./components/ListOfJobs/reducers').default,
  ...require('./components/Rating/reducers').default,
};
