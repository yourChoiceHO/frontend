import { complement, equals, pathOr } from "ramda";

import Container from "@/containers/Container";
import api from "@/lib/api";
import { IAuthenticationContext } from "@/types/context";
import { Role } from "@/types/model";

class AuthenticationContainer extends Container<IAuthenticationContext> {
  public state: IAuthenticationContext = {
    error: {},
    pending: false,
    user: { role: Role.Supervisor }
  };

  public getRole = (): Role => {
    const role = pathOr(Role.Unauthorized, ["user", "role"], this.state);
    return parseInt(role, 10);
  };

  public isLoggedIn = () => {
    const role = this.getRole();
    return complement(equals)(Role.Unauthorized, role);
  };

  public loginUser = (credentials: any) => {
    this.setState({ pending: true });
    return api.authentication
      .loginUser(credentials)
      .fork(
        error => this.setState({ error, pending: false }),
        ({ user }) => this.setState({ user, error: {}, pending: false })
      );
  };

  public logout = () => {
    this.setState({ pending: true });
    return api.authentication
      .logout()
      .fork(
        error => this.setState({ error, pending: false }),
        user => this.setState({ user, error: {}, pending: false })
      );
  };

  public setError = error => this.setState({ error });
}

export default AuthenticationContainer;
