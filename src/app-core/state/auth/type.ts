export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  userName: string;
  name: string;
}

export type LoginResponseType = {
  id: string;
  userName: string;
  email: string;
  roles: string;
  isVerified: boolean;
  accessToken: string;
  refreshToken: string;
};
export type RegisterResponseType = {
  success: boolean;
  errors: [
    {
      errorCode: number;
      fieldName: string;
      description: string;
    },
  ];
};
export interface AuthBaseResponse<T> {
  success: boolean;
  errors: [
    {
      errorCode: number;
      fieldName: string;
      description: string;
    },
  ];
  data: T;
}
