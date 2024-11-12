import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestTransformer,
  AxiosResponse,
} from 'axios';
import { isPlainObject } from 'lodash';
import { toast } from 'react-toastify';
import { AuthRoutePath } from '~/routes';
import {
  clearUser,
  getUserRefreshToken,
  getUserToken,
  saveUserRefreshToken,
  saveUserToken,
} from '~/storage/auth';
import { convertToDateType2 } from '~/utils/date';

const dateTransformer: (data: any) => AxiosRequestTransformer = (data) => {
  if (data instanceof Date) {
    return convertToDateType2(data);
  }
  if (Array.isArray(data)) {
    return data.map((v) => dateTransformer(v));
  }
  if (isPlainObject(data)) {
    return Object.fromEntries(
      Object.entries(data).map(([k, v]) => [k, dateTransformer(v)])
    );
  }
  return data;
};

let instance: AxiosInstance | null = null;
let instance_manual: AxiosInstance | null = null;
let instanceList: AxiosInstance[] = [];

export async function initApi() {
  instance = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API || '',
    transformRequest: [
      dateTransformer,
      ...(axios.defaults.transformRequest as AxiosRequestTransformer[]),
    ],
  });

  instance_manual = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API_MANUAL || '',
    transformRequest: [
      dateTransformer,
      ...(axios.defaults.transformRequest as AxiosRequestTransformer[]),
    ],
  });

  instanceList = [instance, instance_manual];

  instanceList.forEach((ins) => {
    ins.interceptors.request.use(
      function (config) {
        const authorization = getUserToken();
        const refreshToken = getUserRefreshToken();

        if (authorization) {
          config.headers.setAuthorization(authorization);
        }
        if (refreshToken) {
          config.headers.set('refreshtoken', refreshToken);
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    ins.interceptors.response.use(
      function (config) {
        const headers = config.headers;
        const authorization = headers.authorization;
        const refreshtoken = headers.refreshtoken;

        // console.log('override token', authorization, refreshtoken)
        if (authorization && refreshtoken) {
          saveUserToken(authorization);
          saveUserRefreshToken(refreshtoken);
        }
        return config;
      },
      function (error) {
        const { response } = error;
        if (response && response.status === 401) {
          clearUser();
          toast.error('Token không hợp lệ');
          setTimeout(() => (window.location.href = AuthRoutePath.LOGIN), 3000);
          return;
        }
        const { stack, ...error_info } = error;
        console.log({ intercept_error: error_info });
        return Promise.reject(response);
      }
    );
  });
}

const _httpPost =
  (req: AxiosInstance) =>
  <T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D | undefined,
    config?: AxiosRequestConfig<D> | undefined
  ) => {
    const interceptData = data as D & {
      columns: string[] | string;
      filter: string[] | string;
      take: number | undefined;
    };
    if (
      Object.prototype.hasOwnProperty.call(interceptData, 'columns') &&
      !!interceptData
    ) {
      const columns = interceptData['columns'];
      if (Array.isArray(columns)) {
        interceptData['columns'] = columns.join(',');
      }
    }
    if (
      !Object.prototype.hasOwnProperty.call(interceptData, 'take') &&
      !!interceptData
    ) {
      // interceptData["take"] = 10000000;
    }

    return req.post(url, interceptData, config) as Promise<R>;
  };

const parseDateObject = (a: any) => {
  if (a instanceof Date) {
    return a.toISOString();
  }
  return a;
};

const httpFormWrapper = (reqFunction: any) =>
  function <T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D | undefined,
    config?: AxiosRequestConfig<FormData> | undefined
  ): Promise<R> {
    const formData = new FormData();
    if (!data) return reqFunction(url, formData, config);
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        const arrKey = `${key}`;
        value.forEach((subValue) => {
          formData.append(arrKey, parseDateObject(subValue));
        });
      } else {
        if (value instanceof Blob || typeof value === 'string') {
          formData.append(key, value);
        } else {
          if (value == null) formData.append(key, '');
          else {
            formData.append(key, parseDateObject(value));
          }
        }
      }
    }
    return reqFunction(url, formData, config);
  };

export const req = instance;
export const httpGet = (i = 0) => instanceList[i].get;
export const httpPatch = (i = 0) => instanceList[i].patch;
export const httpPost = (i = 0) => _httpPost(instanceList[i]);
export const httpPostForm = (i = 0) =>
  httpFormWrapper(instanceList[i].postForm);
export const httpPut = (i = 0) => instanceList[i].put;
export const httpDel = (i = 0) => instanceList[i].delete;
