import fetch from "@/lib/fetch";
import { AxiosRequestConfig } from "axios";

export const del = <T = any>(url: string, config: AxiosRequestConfig = {}) =>
  fetch<T>({
    ...config,
    method: "delete",
    url
  });

export const get = <T = any>(url: string, config: AxiosRequestConfig = {}) =>
  fetch<T>({
    ...config,
    method: "get",
    url
  });

export const put = <T = any>(
  url: string,
  data: any,
  config: AxiosRequestConfig = {}
) =>
  fetch<T>({
    ...config,
    data,
    method: "put",
    url
  });

export const post = <T = any>(
  url: string,
  data: any,
  config: AxiosRequestConfig = {}
) =>
  fetch<T>({
    ...config,
    data,
    method: "post",
    url
  });
