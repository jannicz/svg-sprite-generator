import { atom } from 'recoil';

export const markupDialogState = atom({
  key: 'markupDialogState',
  default: {
    open: false,
    markup: ''
  }
});
