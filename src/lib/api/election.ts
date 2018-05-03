import * as http from "@/lib/http";
import { IElectionEntity } from "@/types/model";

export function create(election: Partial<IElectionEntity>) {
  return http.post<IElectionEntity>("/elections", election);
}

export function remove(id: number) {
  return http.del<IElectionEntity>(`/elections/${id}`);
}

export function getAll() {
  return http.get<IElectionEntity[]>("/elections");
}

export function get(id: number) {
  return http.get<IElectionEntity>(`/elections/${id}`);
}

export function update(id: number, updates: Partial<IElectionEntity> = {}) {
  return http.put<IElectionEntity>(`/elections/${id}`, updates);
}
