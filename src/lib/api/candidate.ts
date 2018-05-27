import * as http from "@/lib/http";
import { ICandidateEntity } from "@/types/model";

export function getByElection(id: number) {
  return http.get<ICandidateEntity[]>(`/candidate`, {
    params: { election_id: id }
  });
}
