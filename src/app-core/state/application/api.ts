import {apiClient} from '@app-core/network/apiClient';
import {apiCallProxy, makeParam} from '@app-core/network/proxy';
import {call} from 'redux-saga/effects';

export enum DocumentKindEnum {
  AVATAR = 'avatar',
  VIDEO = 'video',
  ATTACHMENT = 'attachment',
}

type S3PresignedRequestType = {
  type_model: DocumentKindEnum;
  number_file: number;
};

type S3PresignedResponseType = {
  fields: {
    acl: string;
    expires: string;
    key: string;
    policy: string;
    successActionStatus: string;
    xAmzAlgorithm: string;
    xAmzCredential: string;
    xAmzDate: string;
    xAmzSignature: string;
  };
  host: string;
  url: string;
};

export function* requestS3Presigned(
  param: S3PresignedRequestType,
): Generator<any, Partial<S3PresignedResponseType>, any> {
  const newParam = {
    ...param,
  };
  const queries = makeParam(newParam);

  const apiRequest = (token: string) =>
    new apiClient(token).get('s3_presigned/' + queries);

  return yield call(apiCallProxy, apiRequest);
}
