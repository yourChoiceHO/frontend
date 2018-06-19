import { Moment } from "moment";

export enum Role {
  Moderator = 2,
  Supervisor = 1,
  Unauthorized = -1,
  Voter = 3
}

export enum ElectionTypes {
  Europawahl = "Europawahl",
  Bundestagswahl = "Bundestagswahl",
  Landtagswahl = "Landtagswahl",
  Buergermeisterwahl = "Buergermeisterwahl",
  Referendum = "Referendum",
  Kommunalwahl = "Kommunalwahl",
  LandtagswahlBW = "LandtagswahlBW",
  LandtagswahlSL = "LandtagswahlSL"
}

export enum ElectionStateTypes {
  Bearbeitung = 0,
  Pruefung = 1,
  Freigegeben = 2,
  ImGange = 3,
  Abgeschlossen = 4
}

export enum ElectionStates {
  Bearbeitung = "Bearbeitung",
  Pruefung = "Prüfung",
  Freigegeben = "Freigegeben",
  ImGange = "Im Gange",
  Abgeschlossen = "Abgeschlossen"
}

export interface IPartyEntity {
  consituency: number;
  election_id: number;
  id_party: number;
  name: string;
  text: string;
  vote: number;
}

export interface ICandidateEntity {
  consituency: number;
  election_id: number;
  first_name: string;
  id_candidate: number;
  last_name: string;
  party_id: number;
  vote: number;
}

export interface IVoteEntity {
  client_id: number;
  election_id: number;
  first_vote: number;
  second_vote: number;
  valid: number;
  voter_id: number;
}

export interface IElectionEntity {
  client_id: number;
  end_date: Moment;
  id_election: number;
  start_date: Moment;
  state: number;
  text: string;
  typ: string;
}

export interface IReferendumEntity {
  consituency: number;
  election_id: number;
  id_referendum: number;
  no: number;
  text: string;
  yes: number;
}

export interface IClientEntity {
  id_client: number;
  type: number;
}

export interface IUserEntity {
  client_id: number;
  id_user: number;
  password: string;
  role: Role;
  username: string;
}

export interface IVoterEntity {
  constituency: number;
  first_name: string;
  hash: string;
  id_voter: number;
  last_name: string;
  password: string;
}

export interface IElectionVote {
  first_vote: number;
  second_vote: number;
  valid: boolean;
}

export interface IEvaluation {
  general?: {
    text?: string;
    yes?: {
      vote_number: number;
      vote_percent: number;
    };
    no?: {
      vote_number: number;
      vote_percent: number;
    };
    parties?: IPartyEntity[];
    candidates?: ICandidateEntity[];
  };
  consituency?: ICandidateEntity[];
}
