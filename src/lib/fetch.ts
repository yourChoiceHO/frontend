import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import MockAdapter from "axios-mock-adapter";
import { Future, RejectFunction, ResolveFunction } from "fluture";
import { equals } from "ramda";

import { useAuthenticationMock } from "@/__mocks__/authentication";
import { useElectionMock } from "@/__mocks__/election";

const client = axios.create({
  baseURL: process.env.API_URL
});

if (equals(process.env.FAKE_API, "yes")) {
  const mock = new MockAdapter(client, { delayResponse: 750 });

  useAuthenticationMock(mock);
  useElectionMock(mock);
}

const fetch = <T = any>(config: AxiosRequestConfig): Future<AxiosError, T> =>
  Future((reject: RejectFunction<AxiosError>, resolve: ResolveFunction<T>) => {
    client(config)
      .then((response: AxiosResponse<T>) => resolve(response.data))
      .catch(reject);
  });

export default fetch;
