import axios, {Axios, AxiosError, AxiosResponse} from "axios";
import {API_CONFIG} from "./api.config";

const DEFAULT_VALUE_FOR_ERROR_RESPONSE = {data: {message: ""}, status: 0};

export class APIService {
  axiosClient: Axios;
  static instance: APIService;

  constructor() {
    this.axiosClient = axios.create(API_CONFIG);
    // this.configureInterceptors();
  }

  static getInstance = () => {
    if (!this.instance) {
      this.instance = new APIService();
    }
    return this.instance;
  };

  errorHandler = async (error: AxiosError) => {
    const {response} = error;
    const {data, status} = response || DEFAULT_VALUE_FOR_ERROR_RESPONSE;
    const message = data;
    return {data: null, status, statusText: message};
  };

  successHandler = (response: AxiosResponse) => {
    const {status, statusText, headers} = response;
    return {data: response.data, status, statusText, headers};
  };

  // configureInterceptors = () => {
  //   this.axiosClient.interceptors.response.use(
  //     (response: AxiosResponse) => this.successHandler(response),
  //     (error: AxiosError) => this.errorHandler(error)
  //   );
  //   this.axiosClient.interceptors.request.use((request) => request);
  // };

  updateAuthToken = (token: string) => {
    this.axiosClient.defaults.headers.common.Authorization = `${token}`;
  };

  get = async (url: string) => {
    const res = await this.axiosClient
      .get(url)
      .then((response: AxiosResponse) => response);
    return res;
  };

  delete = async (url: string) => {
    const res = await this.axiosClient
      .delete(url)
      .then((response: AxiosResponse) => response);
    return res;
  };

  post = async (url: string, payload: any, config?: any) => {
    let res;
    if (config) {
      res = await this.axiosClient
        .post(url, payload, config)
        .then((response: AxiosResponse) => response);
    } else {
      res = await this.axiosClient
        .post(url, payload)
        .then((response: AxiosResponse) => response);
    }
    return res;
  };

  put = async (url: string, payload: any) => {
    const res = await this.axiosClient
      .put(url, payload)
      .then((response: AxiosResponse) => response);
    return res;
  };

  patch = async (url: string, payload: any) => {
    const res = await this.axiosClient
      .patch(url, payload)
      .then((response: AxiosResponse) => response);
    return res;
  };
}
