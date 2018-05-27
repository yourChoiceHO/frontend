import { Col, Icon, Layout, Row } from "antd";
import classNames from "classnames/bind";
import React, { SFC } from "react";
import { Link } from "react-router-dom";

import AuthenticationContainer from "@/containers/Authentication";
import connect from "@/containers/connect";

import styles from "./styles/header.module.less";

const { Header } = Layout;
const cx = classNames.bind(styles);

const PageHeader: SFC<{ authentication: AuthenticationContainer }> = ({
  authentication,
  ...props
}) => {
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
};

export default connect({
  authentication: AuthenticationContainer
})(PageHeader);
