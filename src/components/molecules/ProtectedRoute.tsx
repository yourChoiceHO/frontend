import { any, equals } from "ramda";
import React, { ComponentType, SFC } from "react";
import {
  Redirect,
  RedirectProps,
  Route,
  RouteComponentProps
} from "react-router-dom";

import AuthenticationContainer from "@/containers/Authentication";
import { Role } from "@/types/model";

import connect from "@/containers/connect";

interface IProtectedRouteProps {
  authentication: AuthenticationContainer;
  component: ComponentType<
    RouteComponentProps<{}> & {
      authentication: AuthenticationContainer;
    }
  >;
  redirectProps: RedirectProps;
  roles: Role[];
}

const ProtectedRoute: SFC<RouteComponentProps<{}> & IProtectedRouteProps> = ({
  component: Component,
  redirectProps,
  authentication,
  roles,
  ...rest
}) => {
  const role = authentication.getRole();
  const renderRoute = (props: RouteComponentProps<{}>) =>
    any<Role>(equals(role), roles) ? (
      <Component {...rest} {...props} authentication={authentication} />
    ) : (
      <Redirect {...redirectProps} />
    );

  return <Route render={renderRoute} />;
};

export default connect({
  authentication: AuthenticationContainer
})(ProtectedRoute);
