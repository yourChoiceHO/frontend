import { Layout } from "antd";
import React, { SFC } from "react";

import Content from "@/components/organisms/Content";

interface IPageTemplateProps {
  header: JSX.Element;
}

const PageTemplate: SFC<IPageTemplateProps> = ({ header, children }) => (
  <Layout style={{ minHeight: "100vh" }}>
    <Layout>
      {header && header}
      <Content>{children}</Content>
    </Layout>
  </Layout>
);

export default PageTemplate;
