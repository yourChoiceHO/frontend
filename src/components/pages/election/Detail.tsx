import React, { SFC } from "react";

import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";
// import { IElectionEntity } from "@/types/model";

const ElectionDetailPage: SFC<{}> = () => {
  return (
    <PageTemplate header={<Header />}>
      <div>Wahl Details</div>
    </PageTemplate>
  );
};

export default ElectionDetailPage;
