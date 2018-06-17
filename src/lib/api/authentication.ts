import Future from "fluture";

import * as http from "@/lib/http";
import { IRequestError } from "@/types/error";
import { IUserEntity, IVoterEntity } from "@/types/model";

export function loginUser(credentials: any) {
  return http.post<IUserEntity>("/login/user", credentials);
}

export function loginVoter(credentials: any) {
  return http.post<IVoterEntity>("/login/voter", credentials);
}

export function logout(): Future<IRequestError, {}> {
  return Future.of({});
}
