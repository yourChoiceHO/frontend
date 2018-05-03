import React, { SFC } from "react";

import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";

const ElectionEditPage: SFC<{}> = () => {
  return (
    <PageTemplate header={<Header />}>
      <div>Wahl bearbeiten</div>
    </PageTemplate>
  );
};

export default ElectionEditPage;
