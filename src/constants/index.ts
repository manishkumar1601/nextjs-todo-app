export interface UserData {
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  id: string;
}

export interface ApiResponseObj {
  success: boolean;
  data?: object | Array<object>;
  error?: object | Array<object>;
  message?: string;
}

export const defaultSignupData = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

// Local Storage Keys
export const LS_KEYS = {
  TOKEN: "token",
  REFRESH_TOKEN: "refreshToken",
  USER_DATA: "userData",
}

export interface Todo {
  id?: string;
  content: string;
  isCompleted: boolean;
  userId?: string;
}