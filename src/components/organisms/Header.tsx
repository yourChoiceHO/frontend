import { Col, Icon, Layout, Row } from "antd";
import classNames from "classnames/bind";
import React, { SFC } from "react";
import { Link } from "react-router-dom";
import { Subscribe } from "unstated";

import AuthenticationContainer from "@/containers/Authentication";

import styles from "./styles/header.module.less";

const { Header } = Layout;
const cx = classNames.bind(styles);

const PageHeader: SFC<{}> = () => {
  return (
    <Subscribe to={[AuthenticationContainer]}>
      {(authentication: AuthenticationContainer) => {
        return (
          <Header className={cx("header")}>
            <Row>
              <Col offset={6} span={12}>
                <h1 className={cx("title")}>
                  <Link className={cx("title-link")} to="/">
                    <Icon type="check-square-o" />{" "}
                    <div className={cx("title-text")}>yourChoice</div>
                  </Link>
                </h1>
              </Col>
            </Row>
          </Header>
        );
      }}
    </Subscribe>
  );
};

export default PageHeader;
