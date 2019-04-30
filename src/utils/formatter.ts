import { ISalary } from '../screens/NewFeed/services/typings';
import { isEmpty } from 'lodash';

export const salaryFormatter = (salary: ISalary) => {
  if (!isEmpty(salary)) {
    const { from, to, currency } = salary;
    return `${from} - ${to} ${currency}`;
  }
  return 'Negotiatible';
};
