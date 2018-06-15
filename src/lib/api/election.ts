import * as http from "@/lib/http";
import { IElectionEntity } from "@/types/model";

export function create(election: Partial<IElectionEntity>) {
  return http.post<IElectionEntity>("/election", election);
}

export function remove(id: number) {
  return http.del<IElectionEntity>(`/election`, {
    params: { id_election: id }
  });
}

export function getAll() {
  return http.get<IElectionEntity[]>("/election");
}

export function get(id: number) {
  return http.get<IElectionEntity>(`/election`, {
    params: { id_election: id }
  });
}

export function update(id: number, updates: Partial<IElectionEntity>) {
  return http.put<IElectionEntity>(`/election${id}`, updates);
}
