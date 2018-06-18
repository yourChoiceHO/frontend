import * as http from "@/lib/http";
import TokenStore from "@/store/token";
import {
  IElectionEntity,
  IElectionVote,
  IPartyEntity,
  ICandidateEntity,
  IReferendumEntity
} from "@/types/model";

export function create(election: Partial<IElectionEntity>) {
  const token = TokenStore.get();
  return http.post<IElectionEntity>("/election", election, {
    params: { token }
  });
}

export function remove(id: number) {
  const token = TokenStore.get();
  return http.del<IElectionEntity>(`/election/${id}`, { params: { token } });
}

export function getAll() {
  const token = TokenStore.get();
  return http.get<IElectionEntity[]>("/election", { params: { token } });
}

export function get(id: number) {
  const token = TokenStore.get();
  return http.get<IElectionEntity>(`/election/${id}`, { params: { token } });
}

export function update(id: number, updates: Partial<IElectionEntity>) {
  const token = TokenStore.get();
  return http.put<IElectionEntity>(`/election/${id}`, updates, {
    params: { token }
  });
}

export function evaluate(id: number) {
  const token = TokenStore.get();
  return http.post(
    `/election/${id}/evaluate`,
    {},
    {
      params: { token }
    }
  );
}

export function vote(id: number, electionVote: IElectionVote) {
  const token = TokenStore.get();
  return http.post(`/election/${id}/vote`, electionVote, {
    params: { token }
  });
}

export function addVoters(id: number, parameters) {
  const payload = new FormData();
  const token = TokenStore.get();

  payload.append("upload", parameters.file);

  return http.post<IElectionEntity[]>(`/election/${id}/addVoters`, payload, {
    params: { token }
  });
}

export function addCandidates(id: number, parameters) {
  const payload = new FormData();
  const token = TokenStore.get();

  payload.append("upload", parameters.file);

  return http.post<ICandidateEntity[]>(
    `/election/${id}/addCandidates`,
    payload,
    {
      params: { token }
    }
  );
}

export function addParties(id: number, parameters) {
  const payload = new FormData();
  const token = TokenStore.get();

  payload.append("upload", parameters.file);

  return http.post<IPartyEntity[]>(`/election/${id}/addParties`, payload, {
    params: { token }
  });
}

export function addReferendums(id: number, parameters) {
  const payload = new FormData();
  const token = TokenStore.get();

  payload.append("upload", parameters.file);

  return http.post<IReferendumEntity[]>(
    `/election/${id}/addReferendums`,
    payload,
    {
      params: { token }
    }
  );
}
