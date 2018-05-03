import React, { SFC } from "react";

import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";

const ElectionRemovePage: SFC<{}> = () => {
  return (
    <PageTemplate header={<Header />}>
      <div>Wahl löschen</div>
    </PageTemplate>
  );
};

export default ElectionRemovePage;
