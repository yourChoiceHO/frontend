import * as http from "@/lib/http";
import TokenStore from "@/store/token";
import { ICandidateEntity } from "@/types/model";

export function getByElection(id: number) {
  const token = TokenStore.get();
  return http.get<ICandidateEntity[]>(`/election/${id}/candidates`, {
    params: { token }
  });
}
