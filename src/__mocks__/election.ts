import { AxiosRequestConfig } from "axios";
import MockAdapter from "axios-mock-adapter";
import moment from "moment";
import { find, propEq } from "ramda";

import { IElectionEntity } from "@/types/model";

export function useElectionMock(adapter: MockAdapter): void {
  adapter
    .onGet("/elections", { params: { id: 0 } })
    .reply(handleGetWithParameters);
  adapter.onGet("/elections").reply(handleGetWithoutParameters);
  adapter.onPost("/elections").reply(handlePost);
}

export const elections: IElectionEntity[] = [
  {
    client_id: 1,
    end_date: moment("2017-09-24T18:00:00.000"),
    id_election: 0,
    start_date: moment("2017-09-10T08:00:00.000"),
    state: 1,
    text: "Lorem ipsum dolor sit amet",
    type: "Bundestagswahl"
  },
  {
    client_id: 1,
    end_date: moment("2017-09-24T18:00:00.000"),
    id_election: 1,
    start_date: moment("2017-09-10T08:00:00.000"),
    state: 1,
    text: "Lorem ipsum dolor sit amet",
    type: "Bundestagswahl"
  },
  {
    client_id: 1,
    end_date: moment("2017-09-24T18:00:00.000"),
    id_election: 2,
    start_date: moment("2017-09-10T08:00:00.000"),
    state: 1,
    text: "Lorem ipsum dolor sit amet",
    type: "Bundestagswahl"
  },
  {
    client_id: 1,
    end_date: moment("2017-09-24T18:00:00.000"),
    id_election: 3,
    start_date: moment("2017-09-10T08:00:00.000"),
    state: 1,
    text: "Lorem ipsum dolor sit amet",
    type: "Bundestagswahl"
  }
];

function handleGetWithoutParameters(
  config: AxiosRequestConfig
): Promise<any[]> {
  return Promise.resolve([200, elections, {}]);
}

function handleGetWithParameters(config: AxiosRequestConfig): Promise<any[]> {
  const {
    params: { id }
  } = config;

  const election = find(propEq("id_election", id))(elections);

  return Promise.resolve([200, election, {}]);
}

function handlePost(config: AxiosRequestConfig): Promise<any[]> {
  const { data } = config;

  return Promise.resolve([200, data, {}]);
}
