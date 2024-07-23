export interface LoginRequest {
  email: string;
  password: string;
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
