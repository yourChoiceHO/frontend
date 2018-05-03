import { Col, Row } from "antd";
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
      <Link to="/wahl/detail">Wahl inspizieren</Link>
    </li>
    <li>
      <Link to="/wahl/bearbeiten">Wahl bearbeiten</Link>
    </li>
    <li>
      <Link to="/wahl/auswerten">Wahl auswerten</Link>
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
          <h2>Wähler</h2>
          <LinkList />
        </Col>
        <Col span={12}>
          <h2>Mitarbeiter</h2>
          <LinkList />0
        </Col>
      </Row>
    </PageTemplate>
  );
};

export default WelcomePage;
