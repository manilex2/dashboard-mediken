export interface Appstate {
  apiStatus: string;
  apiResponseMessage: any;
  apiCodeStatus: number;
  loginStatus?: string;
  userState?: any;
  resetPasswordStatus?: string;
  changePasswordStatus?: string;
}
