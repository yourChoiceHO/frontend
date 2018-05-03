import React, { SFC } from "react";

import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";
// import { IElectionEntity } from "@/types/model";

const ElectionVotePage: SFC<{}> = () => {
  return (
    <PageTemplate header={<Header />}>
      <div>Stimme abgeben</div>
    </PageTemplate>
  );
};

export default ElectionVotePage;
