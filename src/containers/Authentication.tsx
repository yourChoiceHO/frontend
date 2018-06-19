import { complement, equals, pathOr, prop } from "ramda";

import Container from "@/containers/Container";
import api from "@/lib/api";
import TokenStore from "@/store/token";
import { IAuthenticationContext } from "@/types/context";
import { IRequestError } from "@/types/error";
import { Role } from "@/types/model";

class AuthenticationContainer extends Container<IAuthenticationContext> {
  public state: IAuthenticationContext = {
    error: {},
    pending: false,
    token: "",
    user: {},
    id: -1,
    referrer: ""
  };

  public getRole = (): Role => {
    const role = pathOr(Role.Unauthorized, ["user", "role"], this.state);
    return parseInt(role, 10);
  };

  public getId = (): number => {
    const id = pathOr(-1, ["id"], this.state);
    return id;
  };

  public isLoggedIn = () => {
    const role = this.getRole();
    return complement(equals)(Role.Unauthorized, role);
  };

  public loginUser = (credentials: any) => {
    this.setState({ pending: true });
    return api.authentication.loginUser(credentials).fork(
      error => {
        this.setState({ error, pending: false });
      },
      ({ token, role }) => {
        this.setState({ user: { role }, token, error: {}, pending: false });
        TokenStore.set(token);
      }
    );
  };

  public loginVoter = (credentials: any) => {
    this.setState({ pending: true });
    return api.authentication
      .loginVoter(credentials)
      .fork(this.setError, ({ id, token, role }) => {
        this.setState({
          error: {},
          pending: false,
          user: { role },
          token,
          id
        });
        TokenStore.set(token);
      });
  };

  public logout = () => {
    const referrers = {
      [Role.Moderator]: "/mitarbeiter/anmelden",
      [Role.Supervisor]: "/mitarbeiter/anmelden",
      [Role.Voter]: "/wähler/anmelden",
      [Role.Unauthorized]: "/wähler/anmelden"
    };

    const referrer = prop(this.getRole(), referrers);

    this.setState({ pending: true, referrer: "" });
    return api.authentication.logout().fork(
      error => {
        this.setState({ error, pending: false });
      },
      user => {
        this.setState({ user, error: {}, pending: false, referrer });
        TokenStore.set("");
      }
    );
  };

  public setError = (error: IRequestError) =>
    this.setState({ error, pending: false });
}

export default AuthenticationContainer;
