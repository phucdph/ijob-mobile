import { ISalary } from '../screens/NewFeed/services/typings';
import { isEmpty } from 'lodash';
import { ILocation } from 'components/Locations/services/typings';

export const salaryFormatter = (salary: ISalary) => {
  if (!isEmpty(salary)) {
    const { from, to, currency } = salary;
    return `${from} - ${to} ${currency}`;
  }
  return 'Negotiatible';
};

const toName = (obj: any) => obj.name;

export const locationFormatter = (locations: ILocation[]) => {
  return (locations || []).map(toName).join(', ');
};
