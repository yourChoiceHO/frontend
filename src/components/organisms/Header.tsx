import { Button, Col, Icon, Layout, Modal, Row } from "antd";
import classNames from "classnames/bind";
import { pathOr } from "ramda";
import React, { SFC } from "react";
import IdleTimer from "react-idle-timer";
import { Link, withRouter } from "react-router-dom";

import AuthenticationContainer from "@/containers/Authentication";
import connect from "@/containers/connect";
import { Role } from "@/types/model";

import styles from "./styles/header.module.less";

const { Header } = Layout;
const cx = classNames.bind(styles);

const labels: { [role: number]: string } = {
  [Role.Moderator]: "Moderator abmelden",
  [Role.Supervisor]: "Wahlleiter abmelden",
  [Role.Voter]: "Abmelden"
};

const getLabel = (role: Role) => labels[role];

const forceLogoutVoter = authentication => () => {
  if (authentication.isLoggedIn()) {
    Modal.info({
      content:
        "Sie wurden aus sicherheitstechnischen Gründen automatisch abgemeldet.",
      title: "Hinweis"
    });
    authentication.logout();
    // election.abort();
  }
};

const PageHeader: SFC<{ authentication: AuthenticationContainer }> = ({
  authentication,
  history
}) => {
  return (
    <IdleTimer idleAction={forceLogoutVoter(authentication)} timeout={300000}>
      <Header className={cx("header")}>
        <Link className={cx("secret")} to="/mitarbeiter/anmelden">
          &nbsp;
        </Link>
        <Row className={cx("header-row")}>
          <Col span={9}>
            {authentication.isLoggedIn() && (
              <Link to="/wahl">
                <Button icon="home" type="primary">
                  Wahlübersicht
                </Button>
              </Link>
            )}
          </Col>
          <Col span={6}>
            <h1 className={cx("title")}>
              <Link className={cx("title-link")} to="/">
                <Icon type="check-square-o" />{" "}
                <div className={cx("title-text")}>yourChoice</div>
              </Link>
            </h1>
          </Col>
          <Col className={cx("content-right")} span={9}>
            {authentication.isLoggedIn() && (
              <Button
                type="primary"
                icon="poweroff"
                onClick={authentication.logout}
              >
                {getLabel(
                  pathOr<Role>(
                    Role.Voter,
                    ["state", "user", "role"],
                    authentication
                  )
                )}
              </Button>
            )}
          </Col>
        </Row>
      </Header>
    </IdleTimer>
  );
};

export default connect({
  authentication: AuthenticationContainer
})(withRouter(PageHeader));
