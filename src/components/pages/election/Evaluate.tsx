import React, { SFC } from "react";

import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";

const ElectionEvaluatePage: SFC<{}> = () => {
  return (
    <PageTemplate header={<Header />}>
      <div>Wahl Auswertung</div>
    </PageTemplate>
  );
};

export default ElectionEvaluatePage;
