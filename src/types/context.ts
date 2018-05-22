import { IElectionEntity, IUserEntity } from "@/types/model";

export interface IAuthenticationContext {
  error: object;
  pending: boolean;
  user: Partial<IUserEntity>;
}

export interface IElectionsContext {
  election: Partial<IElectionEntity>;
  error: object;
  pending: boolean;
  elections: Partial<IElectionEntity[]>;
}
