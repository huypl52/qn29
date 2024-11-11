import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ISetting } from '~/type/setting';

interface ISettingState {
  setting: ISetting;
  saveSetting: (setting: ISetting) => void;
}

export const useSettingStore = create<ISettingState>()(
  immer((set) => ({
    setting: {
      image_min_size: 0,
      translate_timeout: 0,
      image_max_size: 10,
      document_max_length: 0,
      image_queue_limit: 100,
    },
    saveSetting: (setting: ISetting) =>
      set((state: ISettingState) => {
        state.setting = setting;
      }),
  }))
);
