import {CONFIG} from '@utils/config';
import axios, {AxiosRequestConfig} from 'axios';

import {
  responseInterceptor,
  errorInterceptor,
  requestInterceptor,
} from './interceptor';

const HOST = CONFIG.API_URL;
const API_VERSION = '';

const switching_tenant_url = (url: string) => {
  return API_VERSION + url;
};

const mainAxios = axios.create({
  baseURL: HOST,
  validateStatus: function (status) {
    return status >= 200 && status <= 500;
  },
  timeout: 60000,
});
mainAxios.defaults.baseURL = HOST;
mainAxios.interceptors.response.use(responseInterceptor, errorInterceptor);
mainAxios.interceptors.request.use(requestInterceptor, errorInterceptor);

export enum AcceptType {
  json = 'application/json',
  form_data = 'multipart/form-data',
  url_encode = 'application/x-www-form-urlencoded',
}

const defaultHeader = {
  Accept: AcceptType.json,
  'Content-Type': AcceptType.json,
};

const formHeader = {
  Accept: AcceptType.form_data,
  'Content-Type': AcceptType.form_data,
};

export class apiClient {
  config: AxiosRequestConfig;
  headers: any;

  constructor(token?: string) {
    const authHeader =
      token && token.length > 0 ? {Authorization: 'Bearer ' + token} : null;
    this.config = {};
    this.headers = {
      ...defaultHeader,
      ...authHeader,
    };
  }

  get = (url: string, body?: any, option?: any, baseUrl?: string) => {
    option = option || {};
    const {headers, ...rest} = option;
    const urlMicro = switching_tenant_url(url);
    mainAxios.defaults.baseURL = baseUrl || HOST;
    return mainAxios.get(urlMicro, {
      ...this.config,
      params: {
        ...body,
      },
      headers: {
        ...this.headers,
        ...headers,
      },
      ...rest,
    });
  };

  post = (url: string, body?: any, option?: any, baseUrl?: string) => {
    option = option || {};
    const urlMicro = switching_tenant_url(url);
    const {headers, ...rest} = option;
    mainAxios.defaults.baseURL = baseUrl || HOST;
    return mainAxios.post(urlMicro, body, {
      ...this.config,
      headers: {
        ...this.headers,
        ...headers,
      },
      ...rest,
    });
  };

  postForm = (url: string, body?: any, option?: any, baseUrl?: string) => {
    option = option || {};
    const urlMicro = switching_tenant_url(url);
    const {headers, ...rest} = option;
    mainAxios.defaults.baseURL = baseUrl || HOST;
    return mainAxios.post(urlMicro, body, {
      ...this.config,
      headers: {
        ...this.headers,
        ...formHeader,
        ...headers,
      },
      ...rest,
    });
  };

  delete = (url: string, body?: any, option?: any, baseUrl?: string) => {
    option = option || {};
    const urlMicro = switching_tenant_url(url);
    const {headers, ...rest} = option;
    mainAxios.defaults.baseURL = baseUrl || HOST;
    return mainAxios.delete(urlMicro, {
      ...this.config,
      headers: {
        ...this.headers,
        ...headers,
      },
      data: {
        ...body,
      },
      ...rest,
    });
  };

  put = (url: string, body?: any, option?: any, baseUrl?: string) => {
    option = option || {};
    const urlMicro = switching_tenant_url(url);
    const {headers, ...rest} = option;
    mainAxios.defaults.baseURL = baseUrl || HOST;
    return mainAxios.put(urlMicro, body, {
      ...this.config,
      headers: {
        ...this.headers,
        ...headers,
      },
      ...rest,
    });
  };

  patch = (url: string, body?: any, option?: any, baseUrl?: string) => {
    option = option || {};
    const urlMicro = switching_tenant_url(url);
    const {headers, ...rest} = option;
    mainAxios.defaults.baseURL = baseUrl || HOST;
    return mainAxios.patch(urlMicro, body, {
      ...this.config,
      headers: {
        ...this.headers,
        ...headers,
      },
      ...rest,
    });
  };
}
