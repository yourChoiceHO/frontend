import Future from "fluture";

import * as http from "@/lib/http";
import { IRequestError } from "@/types/error";
import { IUserEntity } from "@/types/model";

export function loginUser(credentials: any) {
  return http.post<IUserEntity>("/user/authenticate", credentials);
}

export function loginVoter(credentials: any) {
  return http.post<IUserEntity>("/voter/authenticate", credentials);
}

export function logout(): Future<IRequestError, {}> {
  return Future.of({});
}
