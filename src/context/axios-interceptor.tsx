"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { URL_API_BASE } from "@/constants/url-api.constants";
import { ReactNode } from "react";

const instance = axios.create({
  baseURL: URL_API_BASE,
});

const AxiosInterceptor = ({ children }: { children: ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resInterceptor = (response: any) => {
    return response;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errInterceptor = (error: any) => {
    return Promise.reject();
  };

  instance.interceptors.response.use(resInterceptor, errInterceptor);

  instance.interceptors.request.use(
    (config: any) => config,
    (error: any) => Promise.reject(error)
  );

  return children;
};

export default instance;

export { AxiosInterceptor };
