import React, { Component, SFC } from "react";

import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";

const VoterLoginPage: SFC<{}> = () => (
  <PageTemplate header={<Header />}>
    <h2>Voter</h2>
  </PageTemplate>
);

export default VoterLoginPage;
