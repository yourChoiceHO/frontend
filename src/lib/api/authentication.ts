import Future from "fluture";

import * as http from "@/lib/http";
import { IRequestError } from "@/types/error";
import { IUserEntity } from "@/types/model";

export function login(credentials: any) {
  return http.post<IUserEntity>("/auth/login", credentials);
}

export function logout(): Future<IRequestError, {}> {
  return Future.of({});
}
