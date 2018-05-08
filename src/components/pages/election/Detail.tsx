import moment from "moment";

import React, { SFC } from "react";

import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";

// import { IElectionEntity } from "@/types/model";

import { IElectionEntity } from "@/types/model";

import { Button, Card } from "antd";
const ButtonGroup = Button.Group;

const election: IElectionEntity = {
  client_id: 2,
  end_date: moment("07062018", "DDMMYYYY"),
  id_election: 1,
  start_date: moment(),
  state: 7,
  text: "Sampletext Sampletext Sampletext Sampletext Sampletext Sampletext",
  type: "Bundestagswahl"
};

const ElectionDetailPage: SFC<{}> = () => {
  return (
    <PageTemplate header={<Header />}>
      <div style={{ background: "#ECECEC", padding: "30px" }}>
        <Card title={election.type} bordered={true} style={{ width: 300 }}>
          <p>{election.text}</p>
          <p>Wahl ID: {election.id_election}</p>
          <p>Client ID: {election.client_id}</p>
          <p>Zustand: {election.state}</p>
          <p>startet am: {election.start_date.format("LLL")}</p>
          <p>endet am: {election.end_date.format("LLL")}</p>
        </Card>
      </div>
      <div>
        <Button>Bearbeiten</Button>
        <ButtonGroup style={{ padding: "30px" }}>
          <Button>Speichern</Button>
          <Button>Abbrechen</Button>
        </ButtonGroup>
      </div>
    </PageTemplate>
  );
};

export default ElectionDetailPage;
