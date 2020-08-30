import { atom } from 'recoil';

export const applicationState = atom({
  key: 'applicationState',
  default: {
    error: false,
    loading: false
  }
});
