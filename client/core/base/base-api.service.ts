import axios, {Axios, AxiosError, AxiosResponse} from "axios";
import {axiosInstance} from "./api.config";
import {json} from "stream/consumers";

const DEFAULT_VALUE_FOR_ERROR_RESPONSE = {data: {message: ""}, status: 0};

export class APIService {
  static errorHandler = async (error: AxiosError) => {
    const {response} = error;
    const {data, status} = response || DEFAULT_VALUE_FOR_ERROR_RESPONSE;
    const message = data;
    return {data: null, status, statusText: message};
  };

  static successHandler = (response: AxiosResponse) => {
    const {status, statusText, headers} = response;
    return {data: response.data, status, statusText, headers};
  };

  // configureInterceptors = () => {
  //   axiosInstance.interceptors.response.use(
  //     (response: AxiosResponse) => this.successHandler(response),
  //     (error: AxiosError) => this.errorHandler(error)
  //   );
  //   axiosInstance.interceptors.request.use((request) => request);
  // };

  static updateAuthToken = (token: string) => {
    axiosInstance.defaults.headers.common.Authorization = `${token}`;
  };

  static jsonParser = (data: string) => JSON.parse(data);

  static get = async (url: string) => {
    const res = await axiosInstance
      .get(url)
      .then((response: AxiosResponse) => response);
    return res;
  };

  static delete = async (url: string) => {
    const res = await axiosInstance
      .delete(url)
      .then((response: AxiosResponse) => response);
    return res;
  };

  static post = async (url: string, payload: any, config?: any) => {
    let res;
    if (config) {
      res = await axiosInstance
        .post(url, payload, config)
        .then((response: AxiosResponse) => response);
    } else {
      res = await axiosInstance
        .post(url, payload)
        .then((response: AxiosResponse) => response);
    }
    return res;
  };

  static put = async (url: string, payload: any) => {
    const res = await axiosInstance
      .put(url, payload)
      .then((response: AxiosResponse) => response);
    return res;
  };

  static patch = async (url: string, payload: any) => {
    const res = await axiosInstance
      .patch(url, payload)
      .then((response: AxiosResponse) => response);
    return res;
  };
}
