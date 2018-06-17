import { IRequestError } from "@/types/error";

import {
  ICandidateEntity,
  IElectionEntity,
  IPartyEntity,
  IReferendumEntity,
  IUserEntity
} from "@/types/model";

export interface IAuthenticationContext {
  error: IRequestError | {};
  pending: boolean;
  token: string;
  user: Partial<IUserEntity>;
}

export interface ICandidateContext {
  error: object;
  pending: boolean;
  candidates: Partial<ICandidateEntity[]>;
}

export interface IElectionsContext {
  election: Partial<IElectionEntity>;
  error: object;
  evaluation: object;
  pending: boolean;
  elections: Partial<IElectionEntity[]>;
}

export interface IPartyContext {
  error: object;
  pending: boolean;
  parties: Partial<IPartyEntity[]>;
}

export interface IReferendumContext {
  error: object;
  pending: boolean;
  referendums: Partial<IReferendumEntity[]>;
}
