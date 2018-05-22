import hoistNonReactStatics from "hoist-non-react-statics";
import { complement, equals, pathOr } from "ramda";
import React from "react";
import { Subscribe } from "unstated";

import Container from "@/containers/Container";
import api from "@/lib/api";
import { IAuthenticationContext } from "@/types/context";
import { Role } from "@/types/model";

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

  public login = (credentials: any) => {
    this.setState({ pending: true });
    return api.authentication
      .login(credentials)
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

export const withAuthentication = UnwrappedComponent => {
  const Wrapper = (props, ref) => (
    <Subscribe to={[AuthenticationContainer]}>
      {authentication => (
        <UnwrappedComponent
          {...props}
          authentication={authentication}
          ref={ref}
        />
      )}
    </Subscribe>
  );

  const name = UnwrappedComponent.displayName || UnwrappedComponent.name;
  Wrapper.displayName = `withAuthentication(${name})`;

  return hoistNonReactStatics(React.forwardRef(Wrapper), UnwrappedComponent);
};

export default AuthenticationContainer;
