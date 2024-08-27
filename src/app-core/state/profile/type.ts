import {BaseResType} from '../type';

export type TProfileResponse = {
  success: boolean;
  errors: [
    {
      errorCode: number;
      fieldName: string;
      description: string;
    },
  ];
  data: TProfile;
};

export type TProfile = {
  id: string;
  name: string;
  username: string;
  address: string;
  phone: string;
  roles: string;
  email: string;
  avatar: string;
  birthday: string;
  created: string;
  createdBy: string;
  lastModifiedBy: string;
  lastModified: string;
  status: number;
};
export type TGetProfileResponse = BaseResType<TProfile>;
