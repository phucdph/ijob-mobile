import {
  saveJob,
  saveJobFail,
  saveJobSuccess,
  unsaveJob,
  unsaveJobFail,
  unsaveJobSuccess,
  getJobs,
  getJobsFail,
  getJobsSuccess,
  getNextJobs,
  getNextJobsFail,
  getNextJobsSuccess,
  refreshJobs
} from './actions';
import { createReducers } from 'utils/redux';
import { stateContext, IJobsState, initialState } from './state';
import { ErrorState, IError } from 'services/models/Error';
import { IPageableData } from 'services/models';
import { IJob } from './services/typings';
import { Action } from 'services/typings';
import { getUserProfileSuccess } from '../Profile/actions';
import { IUser } from '../Profile/services/typings';
import { getCompanyJobSuccess } from '../Company/components/ListOfJobs/actions';
import {
  ICompaniesJobState,
  initialCompanyJobState
} from '../Company/components/ListOfJobs/state';
import { ICompany } from '../Company/services/typings';

const feedReducers = [
  {
    on: getJobs,
    reducer: (state: IJobsState, action: Action<{}>) => {
      state.action = action.type;
    }
  },
  {
    on: getJobsSuccess,
    reducer: (state: IJobsState, action: Action<IPageableData<IJob>>) => {
      const { data = [], total = 0 } = action.payload;
      state.action = action.type;
      const ids: string[] = [];
      const jobs: { [id: string]: IJob } = {};
      data.forEach((job: IJob) => {
        ids.push(job.id);
        (jobs as any)[job.id] = job;
      });
      state.data = {
        data: ids,
        total
      };
      state.jobs = jobs;
    }
  },
  {
    on: getJobsFail,
    reducer: (state: IJobsState, action: Action<IError>) => {
      state.action = action.type;
      state.error = new ErrorState(action.payload);
    }
  },
  {
    on: getNextJobs,
    reducer: (state: IJobsState, action: Action<{}>) => {
      state.action = action.type;
    }
  },
  {
    on: getNextJobsSuccess,
    reducer: (state: IJobsState, action: Action<IPageableData<IJob>>) => {
      const { data = [], total = 0 } = action.payload;
      state.action = action.type;
      data.forEach((job: IJob) => {
        state.data.data.push(job.id);
        (state.jobs as any)[job.id] = job;
      });
      state.data.total = total;
    }
  },
  {
    on: getNextJobsFail,
    reducer: (state: IJobsState, action: Action<IError>) => {
      state.action = action.type;
      state.error = new ErrorState(action.payload);
    }
  },
  {
    on: refreshJobs,
    reducer: (state: IJobsState, action: Action<{}>) => {
      state.action = action.type;
    }
  },
  {
    on: saveJob,
    reducer: (state: IJobsState, action: Action<{}>) => {
      state.action = action.type;
    }
  },
  {
    on: saveJobFail,
    reducer: (state: IJobsState, action: Action<IError>) => {
      state.action = action.type;
      state.error = new ErrorState(action.payload);
    }
  },
  {
    on: saveJobSuccess,
    reducer: (state: IJobsState, action: Action<string>) => {
      state.action = action.type;
      state.jobs[action.payload].saved = true;
    }
  },
  {
    on: unsaveJob,
    reducer: (state: IJobsState, action: Action<{}>) => {
      state.action = action.type;
    }
  },
  {
    on: unsaveJobFail,
    reducer: (state: IJobsState, action: Action<IError>) => {
      state.action = action.type;
      state.error = new ErrorState(action.payload);
    }
  },
  {
    on: unsaveJobSuccess,
    reducer: (state: IJobsState, action: Action<string>) => {
      state.action = action.type;
      state.jobs[action.payload].saved = false;
    }
  },
  {
    on: getUserProfileSuccess,
    reducer: (state: IJobsState, action: Action<IUser>) => {
      const { saveJob: savedJobs = [] as any } = action.payload;
      savedJobs.forEach((job: IJob) => {
        (state.jobs as any)[job.id] = { ...job, saved: true };
      });
    }
  },
  {
    on: getCompanyJobSuccess,
    reducer(state: IJobsState, action: Action<{ id: string; data: IJob[] }>) {
      const { data } = action.payload;
      data.forEach((job: IJob) => {
        (state.jobs as any)[job.id] = job;
      });
    }
  }
];

export default {
  ...createReducers(stateContext, feedReducers, initialState),
  ...require('./screens/FeedDetail/reducers').default
};
