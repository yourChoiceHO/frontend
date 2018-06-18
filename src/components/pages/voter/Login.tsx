import { Alert } from "antd";
import { pathOr } from "ramda";
import React, { SFC } from "react";
import { Redirect } from "react-router";

import LoginForm from "@/components/molecules/VoterLoginForm";
import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";
import AuthenticationContainer from "@/containers/Authentication";
import connect from "@/containers/connect";
import { FormCallback } from "@/types/props";

const VoterLoginPage: SFC<{ authentication: AuthenticationContainer }> = ({
  authentication
}) => {
  const onSubmit: FormCallback = (error, values) => {
    if (error) {
      authentication.setError(error);
    } else {
      authentication.loginVoter(values);
    }
  };

  if (authentication.isLoggedIn()) {
    return <Redirect to="/wahl" />;
  }

  const pending = pathOr(false, ["state", "pending"], authentication);

  const status = pathOr(
    -1,
    ["state", "error", "response", "status"],
    authentication
  );

  const message = pathOr(
    "",
    ["state", "error", "response", "data", "message"],
    authentication
  );

  return (
    <PageTemplate header={<Header />}>
      <h2>Wähler</h2>
      {status === 403 && (
        <Alert message={message} type="error" showIcon={true} />
      )}
      <LoginForm loading={pending} onSubmit={onSubmit} />
    </PageTemplate>
  );
};

export default connect({
  authentication: AuthenticationContainer
})(VoterLoginPage);
