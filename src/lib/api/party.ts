import * as http from "@/lib/http";
import { IPartyEntity } from "@/types/model";

export function getByElection(id: number) {
  return http.get<IPartyEntity[]>(`/party${id}`);
}
