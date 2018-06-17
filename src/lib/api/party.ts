import * as http from "@/lib/http";
import TokenStore from "@/store/token";
import { IPartyEntity } from "@/types/model";

export function getByElection(id: number) {
  const token = TokenStore.get();
  return http.get<IPartyEntity[]>(`/election/${id}/parties`, {
    params: { token }
  });
}
