import { Gender } from '../models/unmatched.model';

export const Genders: Array<{ value: Gender; label: string }> = [
  {
    value: 'man',
    label: 'UNMATCHED_USER.MAN',
  },
  {
    value: 'woman',
    label: 'UNMATCHED_USER.WOMAN',
  },
  {
    value: 'any',
    label: 'UNMATCHED_USER.ALL_HUMANS',
  },
];
