import { ISetting } from '~/type/setting';
import { httpGet, httpPut } from './_req';

export const getSetting = () => {
  return httpGet()<ISetting>('/settings?');
};

export const updateSetting = (setting: ISetting) => {
  return httpPut()('/settings', setting);
};
