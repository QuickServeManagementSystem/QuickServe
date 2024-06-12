import {AxiosResponse, AxiosError, InternalAxiosRequestConfig} from 'axios';
import cameleKeys from 'camelcase-keys';

export type ResponseData = Array<any> | Record<string, any>;

export const responseInterceptor = (response: AxiosResponse) => {
  console.log('From API: ', response?.request?.responseURL, response?.status);

  if (response.status >= 400) {
    console.log('From API with error: ', response?.data);
    if (response.status === 404) {
      // not found => show customize message instead
      const customError = {
        status: 404,
        ...response?.data,
      };
      return Promise.reject(customError);
    }

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
    // need to show message from server
    const errorObject = cameleKeys(response?.data);

    return Promise.reject({
      ...errorObject,
      status: response.status.toString(),
    });
  }
  const dataObject = Array.isArray(response?.data)
    ? [...response?.data]
    : {
        ...response?.data,
      };
  // https://github.com/yury-dymov/json-api-normalizer/issues/71
  let normalizeData = cameleKeys(dataObject);
  console.log('From API with data: ', normalizeData);
  console.groupEnd();
  return Promise.resolve(normalizeData);
};

export const errorInterceptor = (error: AxiosError) => {
  return Promise.reject(error);
};

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  console.group('REQUEST: ');
  console.log(
    config?.method,
    (config?.baseURL ?? '') + config?.url,
    config?.method === 'POST' ? config?.data : undefined,
  );

  return config;
};
