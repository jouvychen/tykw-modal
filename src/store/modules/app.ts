import { reactive, toRefs } from 'vue';
import { defineStore } from 'pinia';
import { LOCALE_LANG } from '../mutation-types';
import { getStore, setStore } from '@/utils/stroge';
import { localeSetting } from '@/setting/localeSetting';

const lsLocaleSetting = getStore(LOCALE_LANG) || localeSetting;

export const useStoreApp = defineStore('main', {
  state: () => {
    return {
      loading: false, // 加载状态
      localInfo: lsLocaleSetting,
    };
  },
  getters: {

  },
  actions: {
    changeLocalInfo(value: any) {
      this.localInfo = { ...this.localInfo, ...value };
      setStore(LOCALE_LANG, this.localInfo);
    }
  },
});
