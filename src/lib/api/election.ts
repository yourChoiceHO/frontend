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

export function byConstituency(id: number) {
  const token = TokenStore.get();
  return http.get(`/election/${id}/constituency`, {
    params: { token }
  });
}

export const addVoters = id => file => {
  const payload = new FormData();
  const token = TokenStore.get();

  payload.append("upload", file);

  return http.post<IElectionEntity[]>(`/election/${id}/addVoters`, payload, {
    params: { token }
  });
};

export const addCandidates = id => file => {
  const payload = new FormData();
  const token = TokenStore.get();

  payload.append("upload", file);

  return http.post<ICandidateEntity[]>(
    `/election/${id}/addCandidates`,
    payload,
    {
      params: { token }
    }
  );
};

export const addParties = id => file => {
  const payload = new FormData();
  const token = TokenStore.get();

  payload.append("upload", file);

  return http.post<IPartyEntity[]>(`/election/${id}/addParties`, payload, {
    params: { token }
  });
};

export const addReferendums = id => file => {
  const payload = new FormData();
  const token = TokenStore.get();

  payload.append("upload", file);

  return http.post<IReferendumEntity[]>(
    `/election/${id}/addReferendums`,
    payload,
    {
      params: { token }
    }
  );
};

export function removeVoters(id: number, cid: number) {
  const token = TokenStore.get();
  return http.del(`/election/${id}/removeVoters/${cid}`, {
    params: { token }
  });
}

export function removeCandidates(id: number, cid: number) {
  const token = TokenStore.get();
  return http.del(`/election/${id}/removeCandidates/${cid}`, {
    params: { token }
  });
}

export function removeParties(id: number, cid: number) {
  const token = TokenStore.get();
  return http.del(`/election/${id}/removeParties/${cid}`, {
    params: { token }
  });
}

export function removeReferendums(id: number, cid: number) {
  const token = TokenStore.get();
  return http.del(`/election/${id}/removeReferendums/${cid}`, {
    params: { token }
  });
}
