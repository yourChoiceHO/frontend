import React, { SFC } from "react";
import { Redirect } from "react-router";

import LoginForm from "@/components/molecules/UserLoginForm";
import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";
import AuthenticationContainer from "@/containers/Authentication";
import connect from "@/containers/connect";
import { FormCallback } from "@/types/props";

const UserLoginPage: SFC<{ authentication: AuthenticationContainer }> = ({
  authentication
}) => {
  const onSubmit: FormCallback = (error, values) => {
    if (error) {
      authentication.setError(error);
    } else {
      authentication.loginUser(values);
    }
  };

  if (authentication.isLoggedIn()) {
    return <Redirect to="/" />;
  }

  return (
    <PageTemplate header={<Header />}>
      <h2>Mitarbeiter</h2>
      <LoginForm onSubmit={onSubmit} />
    </PageTemplate>
  );
};

export default connect({
  authentication: AuthenticationContainer
})(UserLoginPage);
