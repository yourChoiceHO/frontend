import React, { SFC } from "react";

import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";

const ElectionCreatePage: SFC<{}> = () => {
  return (
    <PageTemplate header={<Header />}>
      <div>Neue Wahl</div>
    </PageTemplate>
  );
};

export default ElectionCreatePage;
