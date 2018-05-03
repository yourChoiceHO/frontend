import { Moment } from "moment";

export enum Role {
  Voter = 0,
  Unauthorized = 1,
  Supervisor = 2,
  Moderator = 3
}

export interface IPartyEntity {
  id_party: number;
  name: string;
  text: string;
  consituency: number;
  election_id: number;
  vote: number;
}

export interface ICandidateEntity {
  id_candidate: number;
  last_name: string;
  first_name: string;
  party_id: number;
  consituency: number;
  election_id: number;
  vote: number;
}

export interface IVoteEntity {
  voter_id: number;
  election_id: number;
  client_id: number;
  first_vote: number;
  second_vote: number;
  valid: number;
}

export interface IElectionEntity {
  id_election: number;
  client_id: number;
  type: string;
  text: string;
  start_date: Moment;
  end_date: Moment;
  state: number;
}

export interface IReferendumEntity {
  id_referendum: number;
  text: string;
  consituency: number;
  election_id: number;
  yes: number;
  no: number;
}

export interface IClientEntity {
  id_client: number;
  type: number;
}

export interface IUserEntity {
  id_user: number;
  client_id: number;
  username: string;
  password: string;
  role: Role;
}

export interface IVoterEntity {
  id_voter: number;
  last_name: string;
  first_name: string;
  hash: string;
  constituency: number;
}
