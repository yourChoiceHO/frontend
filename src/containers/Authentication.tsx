import Container from "@/containers/Container";
import api from "@/lib/api";
import { IAuthenticationContext } from "@/types/context";

class AuthenticationContainer extends Container<IAuthenticationContext> {
  public state: IAuthenticationContext = {
    error: {},
    pending: false,
    user: {}
  };

  public login = (credentials: any) => {
    this.setState({ pending: true });
    return api.authentication
      .login(credentials)
      .fork(
        error => this.setState({ error }),
        user => this.setState({ user, error: {} })
      );
  };

  public logout = () => {
    this.setState({ pending: true });
    return api.authentication
      .logout()
      .fork(
        error => this.setState({ error }),
        user => this.setState({ user, error: {} })
      );
  };
}

export default AuthenticationContainer;
