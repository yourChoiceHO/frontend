import React, { SFC } from "react";

import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";

const ElectionOverviewPage: SFC<{}> = () => {
  return (
    <PageTemplate header={<Header />}>
      <div>Wahl Übersicht</div>
    </PageTemplate>
  );
};

export default ElectionOverviewPage;
