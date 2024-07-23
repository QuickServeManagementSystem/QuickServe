import {normalizeJsonApiIfNeed, formatRequest} from '@utils/normalize';
import {AxiosResponse, AxiosError, InternalAxiosRequestConfig} from 'axios';

export type ResponseData = Array<any> | Record<string, any>;

export const responseInterceptor = (response: AxiosResponse) => {
  console.log(
    formatRequest({
      method: response.config?.method,
      baseURL: response.config?.baseURL ?? '',
      url: response.config?.url,
      data: ['post', 'POST'].includes(response.config?.method ?? '')
        ? response.config?.data
        : response.config?.params,
      statusCode: response?.status,
    }),
  );

  // console.log(
  //   'API status: ',
  //   response?.request?.responseURL,
  //   colorStatusCode(response?.status),
  // );

  if (response.status >= 400) {
    /**
     * {
     * "data": null,
     * "errorCode": "SHARE_COMMON.SYSTEM_ERROR",
     * "message": ["Connection reset by peer; nested exception is java.lang.RuntimeException: Connection reset by peer"],
     * "refCode": null,
     * "status": 500,
     *
     * "statusCode": "500",
     * "success": false,
     * "violations": null
     * }
     */
    // Ignore system Error if needed
    /**
    const SYSTEM_ERROR = ['SYSTEM_ERROR'];
    if (
      response?.status >= 500 ||
      SYSTEM_ERROR.filter(
        systemError =>
          response?.data?.errorCode?.length &&
          response?.data?.errorCode.includes(systemError),
      ).length
    ) {
      let messageStr = '';
      if (response?.data?.message?.length) {
        messageStr = response?.data?.message.reduce(
          (str: string, nextError: any) => {
            return str + `${nextError}` + '\n';
          },
        );
      }

      // const IGNORE_MSG = ['java', 'runtimeException', 'Connection reset by peer'];
      const IGNORE_MSG = ['Connection reset by peer'];
      const shouldIgnore = IGNORE_MSG.filter(ignoreMsg =>
        messageStr.toLowerCase().includes(ignoreMsg.toLowerCase()),
      );
      if (shouldIgnore?.length) {
        return Promise.reject(new Error('IGNORE'));
      }
    } */
    if (response.status === 404) {
      // not found => show customize message instead
    }
    let normalizeError = normalizeJsonApiIfNeed(response?.data);
    normalizeError.status = response.status.toString();
    console.log('API error: ', JSON.stringify(normalizeError));
    console.groupEnd();
    return Promise.reject(normalizeError);
  } else {
    // this response from s3 have key and value, we need keep it the same
    const ignoreResponseFromUrl = [''];
    const requestUrl = response?.request?.responseURL ?? '';

    const shouldIgnore = ignoreResponseFromUrl.reduce(
      (rs, next) => requestUrl.includes(next) || rs,
      false,
    );

    // https://github.com/yury-dymov/json-api-normalizer/issues/71
    let normalizeData = normalizeJsonApiIfNeed(response?.data);

    if (shouldIgnore) {
      normalizeData = response?.data;
    }

    console.log('API response: ', JSON.stringify(normalizeData, null, 2));
    console.groupEnd();
    return Promise.resolve(normalizeData);
  }
};

export const errorInterceptor = (error: AxiosError) => {
  console.log('Error from API: ', error);
  return Promise.reject(error);
};

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  // console.group('CALL NETWORK');
  // console.log(
  //   'REQUEST: ',
  //   formatRequest(
  //     `${config?.method}${(config?.baseURL ?? '') + config?.url}${
  //       ['post', 'POST'].includes(config?.method ?? '')
  //         ? config?.data
  //         : config?.params
  //     }`,
  //   ),
  // );
  // console.log(
  //   'REQUEST: ',
  //   config?.method,
  //   (config?.baseURL ?? '') + config?.url,
  //   ['post', 'POST'].includes(config?.method ?? '')
  //     ? config?.data
  //     : config?.params,
  // );

  // console.log(
  //   formatRequest({
  //     method: config?.method,
  //     baseURL: config?.baseURL ?? '',
  //     url: config?.url,
  //     data: ['post', 'POST'].includes(config?.method ?? '')
  //       ? config?.data
  //       : config?.params,
  //   }),
  // );
  return config;
};
