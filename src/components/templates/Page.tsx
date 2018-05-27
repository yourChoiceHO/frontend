import { Layout } from "antd";
import classNames from "classnames/bind";
import React, { SFC } from "react";

import Content from "@/components/organisms/Content";

import styles from "./styles/page.module.less";

const cx = classNames.bind(styles);

interface IPageTemplateProps {
  header: JSX.Element;
}

const PageTemplate: SFC<IPageTemplateProps> = ({ header, children }) => (
  <Layout className={cx("page")}>
    <Layout>
      {header && header}
      <Content>{children}</Content>
    </Layout>
  </Layout>
);

export default PageTemplate;
