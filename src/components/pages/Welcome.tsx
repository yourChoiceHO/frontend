import { Card, Col, Row } from "antd";
import { AccountCircleIcon, LockIcon } from "mdi-react";
import React, { SFC } from "react";
import { Link } from "react-router-dom";

import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";

const LinkList = () => (
  <ul>
    <li>
      <Link to="/wahl/neu">Wahl erstellen</Link>
    </li>
    <li>
      <Link to="/wahl/0/detail">Wahl inspizieren</Link>
    </li>
    <li>
      <Link to="/wahl/0/bearbeiten">Wahl bearbeiten</Link>
    </li>
    <li>
      <Link to="/wahl/0/auswerten">Wahl auswerten</Link>
    </li>
    <li>
      <Link to="/wahl">Wahlen Übersicht</Link>
    </li>
    <li>
      <Link to="/wahl/entfernen">Wahl löschen</Link>
    </li>
    <li>
      <Link to="/wahl/wählen">Stimme abgeben</Link>
    </li>
  </ul>
);

const WelcomePage: SFC<{}> = () => {
  return (
    <PageTemplate header={<Header />}>
      <h1>Welcome</h1>
      <Row>
        <Col span={12}>
          <Card>
            <AccountCircleIcon />
            <h2>Wähler</h2>
            <Link to="/wähler/anmeldung">Anmeldung</Link>
            <LinkList />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <LockIcon />
            <h2>Mitarbeiter</h2>
            <Link to="/mitarbeiter/anmeldung">Anmeldung</Link>
            <LinkList />
          </Card>
        </Col>
      </Row>
    </PageTemplate>
  );
};

export default WelcomePage;
