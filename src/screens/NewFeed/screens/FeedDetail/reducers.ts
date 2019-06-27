import { createReducers } from 'utils/redux';
import { IJobsDetailState, initialState, jobDetailInitialState, stateContext } from './state';
import { getJobDetail, getJobDetailSuccess, getJobDetailFail, refreshJobDetail, applyJobSuccess, applyJobFail, applyJob } from './actions';
import { Action } from 'services/typings';
import { IJob, IJobDetail } from '../../services/typings';
import { IError } from 'services/models/Error';
import { getJobsSuccess, saveJob, unsaveJob, getNextJobsSuccess } from '../../actions';
import { IPageableData } from 'services/models';
import { searchSuccess, searchNextSuccess } from '../../../Search/screens/SearchResult/actions';
import { IState } from '../../../Search/screens/SearchResult/state';
import { ISearchCompany, ISearchJob } from '../../../Search/screens/SearchResult/services/typings';

const feedDetailReducers = [
  {
    on: [getJobDetail, refreshJobDetail, applyJobSuccess],
    reducer: (state: IJobsDetailState, action: Action<{ id: string }>) => {
      const {id} = action.payload;
      if (!state[id]) {
        state[id] = jobDetailInitialState;
      }
      state[id].action = action.type;
    }
  },
  {
    on: getJobDetailSuccess,
    reducer: (state: IJobsDetailState, action: Action<IJobDetail>) => {
      const { id } = action.payload;
      state[id].action = action.type;
      state[id].data = action.payload;
    }
  },
  {
    on: [getJobDetailFail, applyJobFail],
    reducer: (state: IJobsDetailState, action: Action<{ id: string, error: IError}>) => {
      const { id, error } = action.payload;
      if (!state[id]) {
        state[id] = jobDetailInitialState;
      }
      state[id].error = error;
    }
  },
  {
    on: saveJob,
    reducer: (state: IJobsDetailState, action: Action<string>) => {
      const id = action.payload;
      if (state[id]) {
        state[id].data.saved = true;
      }
    }
  },
  {
    on: applyJob,
    reducer: (state: IJobsDetailState, action: Action<{ id: string }>) => {
      const {id} = action.payload;
      if (state[id]) {
        state[id].data.applied = true;
      }
    }
  },
  {
    on: unsaveJob,
    reducer: (state: IJobsDetailState, action: Action<string>) => {
      const id = action.payload;
      if (state[id]) {
        state[id].data.saved = false;
      }
    }
  },
  {
    on: [getJobsSuccess, getNextJobsSuccess],
    reducer: (state: IJobsDetailState, action: Action<IPageableData<IJob>>) => {
      const { data = [] } = action.payload;
      if (data.length > 0) {
        for (const job of data ) {
          if (!state[job.id]) {
            state[job.id] = {
              ...jobDetailInitialState,
              data: job,
            }
          }
        }
      }
    }
  },
  {
    on: [searchSuccess, searchNextSuccess],
    reducer(
      state: IJobsDetailState,
      action: Action<{
        jobs: IPageableData<ISearchJob>;
      }>
    ) {
      const { jobs } = action.payload;
      if (jobs) {
        const { data = [] } = jobs;
       if (data.length > 0) {
         for (const job of data ) {
           if (!state[job.id]) {
             state[job.id] = {
               ...jobDetailInitialState,
               data: job,
             }
           }
         }
       }
      }
    }
  },
];

export default createReducers(stateContext, feedDetailReducers, initialState);
