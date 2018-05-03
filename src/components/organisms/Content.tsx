import { Layout } from "antd";
import classNames from "classnames/bind";
import React, { SFC } from "react";

import Footer from "@/components/organisms/Footer";

import styles from "./styles/content.module.less";

const { Content } = Layout;
const cx = classNames.bind(styles);

const PageContent: SFC<{}> = ({ children }) => (
  <Content className={cx("content")}>
    <Layout className={cx("card")}>{children}</Layout>
    <Footer />
  </Content>
);

export default PageContent;
