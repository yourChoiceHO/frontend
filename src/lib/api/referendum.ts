import * as http from "@/lib/http";
import TokenStore from "@/store/token";
import { IReferendumEntity } from "@/types/model";

export function getByElection(id: number) {
  const token = TokenStore.get();
  return http.get<IReferendumEntity[]>(`/election/${id}/referendums`, {
    params: { token }
  });
}
