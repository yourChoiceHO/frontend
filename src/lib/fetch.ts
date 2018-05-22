import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Future, RejectFunction, ResolveFunction } from "fluture";

const client = axios.create({
  baseURL: process.env.API_URL
});

const fetch = <T = any>(config: AxiosRequestConfig): Future<AxiosError, T> =>
  Future((reject: RejectFunction<AxiosError>, resolve: ResolveFunction<T>) => {
    client(config)
      .then((response: AxiosResponse<T>) => resolve(response.data))
      .catch(reject);
  });

export default fetch;
