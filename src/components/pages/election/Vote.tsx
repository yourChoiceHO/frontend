import React, { SFC } from "react";

import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";
import { ICandidateEntity, IElectionEntity, IPartyEntity } from "@/types/model";
import { Button, Checkbox, Col, Radio, Row, Table } from 'antd';
import moment from 'moment';

const election: IElectionEntity = {
  client_id: 1,
  end_date: moment("2014-05-25"),
  id_election: 1,
  start_date: moment("2014-05-20"),
  state: 2,
  text: "Land Baden-Württemberg",
  type: "Europawahl"
};

const candidates: ICandidateEntity[] = [{
  consituency: 2,
  election_id: 3,
  first_name: "Tarik",
  id_candidate: 1,
  last_name: "Bozdemir",
  party_id: 1,
  vote: 0,
}, {
  consituency: 4,
  election_id: 2,
  first_name: "Jonas",
  id_candidate: 2,
  last_name: "Hauss",
  party_id: 1,
  vote: 1,
}, {
  consituency: 2,
  election_id: 3,
  first_name: "Matthias",
  id_candidate: 3,
  last_name: "Kaiser",
  party_id: 3,
  vote: 0,
}, {
  consituency: 2,
  election_id: 3,
  first_name: "Jonas",
  id_candidate: 4,
  last_name: "Kirchhofer",
  party_id: 4,
  vote: 0,
}
];

const parties: IPartyEntity[] = [
  {
    consituency: 2,
    election_id: 3,
    id_party: 1,
    name: "AFD",
    text: "Alternative für Deutschland",
    vote: 1,
  },
  {
    consituency: 4,
    election_id: 2,
    id_party: 2,
    name: "CDU",
    text: "Christlich Demokratische Union Deutschlands",
    vote: 0,
  },
  {
    consituency: 4,
    election_id: 2,
    id_party: 3,
    name: "SPD",
    text: "Sozialdemokratische Partei Deutschlands",
    vote: 0,
  },
  {
    consituency: 4,
    election_id: 2,
    id_party: 4,
    name: "FDP",
    text: "Freie Demokratische Partei",
    vote: 0,
  }];

const columnsCandidates = [{
  dataIndex: 'candidate',
  key: 'candidate',
  title: 'Kandidat',
}];

const columnsParties = [{
  dataIndex: 'partyName',
  key: 'partyName',
  title: 'Partei',
}, {
  dataIndex: 'candidatess',
  key: 'candidatess',
  title: 'Kandidaten',
},
{
  dataIndex: 'vote',
  key: 'vote',
  title: 'Stimme',
}
];

const ElectionVotePage: SFC<{}> = () => {

  return (
    <PageTemplate header={<Header />}>

      <h2>Interaktiver Stimmzettel
          für die Wahl der Abgeordneten des Europäischen Parlaments
          am {election.end_date.format("DD.MM.YYYY")} im {election.text}
      </h2 >
      <div>
        <Row >
          <Radio.Group id="radiovote">
            <Table bordered={true} pagination={false} columns={columnsParties}
              dataSource={parties.map(partiesData => {
                return {
                  candidatess: candidates.map(candidatesData => {
                    if (partiesData.id_party === candidatesData.party_id) {
                      return [
                        candidatesData.last_name + " " + candidatesData.first_name + "; "
                      ]
                    }
                  }),
                  key: partiesData.id_party,
                  partyName: partiesData.name + " (" + partiesData.text + ")",
                  vote: <Radio value={partiesData.id_party} />,
                }
              })} />
          </Radio.Group>
        </Row>
        <Row>
          <Checkbox>Stimme ungültig machen.</Checkbox>
        </Row>
        <Row>
          <Col>
            <Button type="primary" >Stimme abgeben!</Button>
          </Col>
        </Row>
      </div>

    </PageTemplate >
  );
};

export default ElectionVotePage;
