import { ISearchCompany } from '../services/typings';
import { ISkill } from 'components/Search/SearchSkill/services/typings';
import { ILocation } from 'components/Locations/services/typings';
import { get } from 'lodash';
export function filterNameFormatter(data: ISearchCompany[] | ISkill[] | ILocation[], defaultName: string) {
  if (data.length === 0) { return defaultName; }
  if (data.length === 1) { return get(data, '[0].name', defaultName);}
  if (data.length > 1) { return ``}
}
