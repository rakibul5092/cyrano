import { environment } from '../../environments/environment';

export const AUTH_APIS: any = {
  login: environment.url + 'v1/auth/login',
  password: {
    forgot: environment.url + 'v1/password/forgot',
    verify: environment.url + 'v1/password/verify',
    reset: environment.url + 'v1/password/reset',
  },
  register: environment.url + 'v1/auth/register',
  google: environment.url + 'v1/auth/login/google',
  facebook: environment.url + 'v1/auth/login/facebook',
  twitter: environment.url + 'v1/auth/login/twitter',
  getUser: environment.url + 'v1/auth/user',
  weeklyRoutine: environment.url + 'v1/weekly-routine',
};

export const USER_REGISTRATION_APIS: any = {
  unmatched: environment.url + 'v1/unmatched/',
  registration: environment.url + 'v1/unmatched/registration',
  verify_otp: environment.url + 'v1/unmatched/verify_otp',
  personal_interests: environment.url + 'v1/personal_interests',
  dating_platforms: environment.url + 'v1/dating-platforms',
  getProps: environment.url + 'v1/unmatched/getprops',
  datingPreferences: environment.url + 'v1/unmatched/datingpref/',
  saveProps: environment.url + 'v1/unmatched/saveprops/',
  resetProps: environment.url + 'v1/unmatched/resetprops',
  like: environment.url + 'v1/unmatched/like/',
  disLike: environment.url + 'v1/unmatched/disLike/',
  matching_profiles: environment.url + 'v1/dummy-profiles/matching-profiles',
  resendOTP: environment.url + 'v1/unmatched/resend-otp',
  account_details: environment.url + 'v1/unmatched/account-details/',
};

export const COMMON_APIS: any = {
  upload: environment.url + 'v1/aws/s3/upload',
};
export const CALENDAR_APIS: any = {
  accounts: {
    common: {
      url: environment.url + 'v1/calendar-accounts/',
      user: environment.url + 'v1/calendar-accounts/user/',
    },
    google: {
      authenticate: environment.url + 'v1/calendar/google/authenticate',
    },
    microsoft: {
      authenticate: environment.url + 'v1/calendar/microsoft/authenticate',
    },
  },
  events: {
    url: environment.url + 'v1/calendar-events/',
    user: environment.url + 'v1/calendar-events/user/',
    google: environment.url + 'v1/calendar-events/google/',
    microsoft: environment.url + 'v1/calendar-events/microsoft/',
  },
};
