import { IOrg } from '~/type/org';
import { httpGet } from './_req';

export const getAllOrg = () => {
  return httpGet()<IOrg[]>('/orgs?');
};
