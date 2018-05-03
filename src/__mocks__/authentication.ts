import { AxiosRequestConfig } from "axios";
import MockAdapter from "axios-mock-adapter";
import { equals } from "ramda";

import { Role } from "@/types/model";

export function useAuthenticationMock(adapter: MockAdapter): void {
  adapter.onGet("/auth/login").reply(handleLogin);
}

const isValidVoterUsername = equals(process.env.VOTER_USERNAME);
const isValidVoterPassword = equals(process.env.VOTER_PASSWORD);
const isValidSupervisorUsername = equals(process.env.SUPERVISOR_USERNAME);
const isValidSupervisorPassword = equals(process.env.SUPERVISOR_PASSWORD);
const isValidModeratorUsername = equals(process.env.MODERATOR_USERNAME);
const isValidModeratorPassword = equals(process.env.MODERATOR_PASSWORD);

function handleLogin(config: AxiosRequestConfig): Promise<any[]> {
  const { username, password } = JSON.parse(config.data);

  let response = [
    403,
    {
      reason: "Ungültiger Benutzername und/oder Passwort.",
      success: false
    },
    {}
  ];

  if (isValidVoterUsername(username) && isValidVoterPassword(password)) {
    response = [
      200,
      {
        accessToken: "123",
        espiresIn: 100,
        idToken: "ABC",
        user: { role: Role.Voter, name: "[Rolle] Waehler" }
      },
      {}
    ];
  } else if (
    isValidSupervisorUsername(username) &&
    isValidSupervisorPassword(password)
  ) {
    response = [
      200,
      {
        accessToken: "123",
        espiresIn: 100,
        idToken: "ABC",
        user: { role: Role.Supervisor, name: "[Rolle] Wahlleiter" }
      },
      {}
    ];
  } else if (
    isValidModeratorUsername(username) &&
    isValidModeratorPassword(password)
  ) {
    response = [
      200,
      {
        accessToken: "123",
        espiresIn: 100,
        idToken: "ABC",
        user: { role: Role.Moderator, name: "[Rolle] Moderator" }
      },
      {}
    ];
  }

  return Promise.resolve(response);
}
