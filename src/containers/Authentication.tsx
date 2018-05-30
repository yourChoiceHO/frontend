import { complement, equals, pathOr } from "ramda";

import Container from "@/containers/Container";
import api from "@/lib/api";
import { IAuthenticationContext } from "@/types/context";
import { IRequestError } from "@/types/error";
import { Role } from "@/types/model";
import { noop } from "@/utils";

class AuthenticationContainer extends Container<IAuthenticationContext> {
  public state: IAuthenticationContext = {
    error: {},
    pending: false,
    user: {}
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

    let cancel = noop;
    const notifier = new Promise((resolve, reject) => {
      cancel = api.authentication.loginUser(credentials).fork(
        error => {
          this.setState({ error, pending: false }, reject);
        },
        ({ user }) => {
          this.setState({ user, error: {}, pending: false }, resolve);
        }
      );
    });

    return {
      cancel,
      notifier
    };
  };

  public loginVoter = (credentials: any) => {
    this.setState({ pending: true });
    return api.authentication
      .loginVoter(credentials)
      .fork(this.setError, ({ voter }) =>
        this.setState({
          error: {},
          pending: false,
          user: { role: Role.Voter, ...voter }
        })
      );
  };

  // public logout = () => {
  //   this.setState({ pending: true });
  //   return api.authentication
  //     .logout()
  //     .fork(this.setError, user =>
  //       this.setState({ user, error: {}, pending: false })
  //     );
  // };

  public logout = () => {
    this.setState({ pending: true });

    let cancel = noop;
    const notifier = new Promise((resolve, reject) => {
      cancel = api.authentication.logout().fork(
        error => {
          this.setState({ error, pending: false }, reject);
        },
        user => {
          this.setState({ user, error: {}, pending: false }, resolve);
        }
      );
    });

    return {
      cancel,
      notifier
    };
  };

  public setError = (error: IRequestError) =>
    this.setState({ error, pending: false });
}

export default AuthenticationContainer;
