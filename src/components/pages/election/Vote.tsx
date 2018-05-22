import { Button, Checkbox, Col, Radio, Row, Table } from "antd";
import moment from "moment";
import React, { Fragment, SFC } from "react";

import { ICandidateEntity, IElectionEntity, IPartyEntity } from "@/types/model";

const election: IElectionEntity = {
  id_election: 1,
  client_id: 1,
  type: "Bundestagswahl",
  text: "Wahlkreis 242 Erlangen",
  start_date: moment(),
  end_date: moment(),
  state: 2
};

const candidates: ICandidateEntity[] = [
  {
    id_candidate: 1,
    last_name: "Bozdemir",
    first_name: "Tarik",
    party_id: 1,
    consituency: 2,
    election_id: 3,
    vote: 0
  },
  {
    id_candidate: 2,
    last_name: "Hauss",
    first_name: "Jonas",
    party_id: 2,
    consituency: 4,
    election_id: 2,
    vote: 1
  },
  {
    id_candidate: 3,
    last_name: "Kaiser",
    first_name: "Matthias",
    party_id: 3,
    consituency: 2,
    election_id: 3,
    vote: 0
  },
  {
    id_candidate: 4,
    last_name: "Kirchhofer",
    first_name: "Jonas",
    party_id: 4,
    consituency: 2,
    election_id: 3,
    vote: 0
  }
];

const parties: IPartyEntity[] = [
  {
    id_party: 1,
    name: "AFD",
    text: "Alternative für Deutschland",
    consituency: 2,
    election_id: 3,
    vote: 1
  },
  {
    id_party: 2,
    name: "CDU",
    text: "Christlich Demokratische Union Deutschlands",
    consituency: 4,
    election_id: 2,
    vote: 0
  },
  {
    id_party: 3,
    name: "SPD",
    text: "Sozialdemokratische Partei Deutschlands",
    consituency: 4,
    election_id: 2,
    vote: 0
  },
  {
    id_party: 4,
    name: "FDP",
    text: "Freie Demokratische Partei",
    consituency: 4,
    election_id: 2,
    vote: 0
  }
];

const columnsFirst = [
  {
    title: "Kandidat",
    dataIndex: "candidate",
    key: "candidate"
  },
  {
    title: "Erststimme",
    dataIndex: "firstVote",
    key: "firstVote"
  }
];

const columnsSecond = [
  {
    title: "Partei",
    dataIndex: "partyName",
    key: "partyName"
  },
  {
    title: "Zweitstimme",
    dataIndex: "secondVote",
    key: "secondVote"
  }
];

const ElectionVote: SFC<{}> = () => {
  return (
    <Fragment>
      <h2>
        Interaktiver Stimmzettel für die {election.type} im {election.text}
      </h2>
      <div>
        <Row>
          <Col span={12}>
            <Radio.Group id="radioFirstVote">
              <Table
                bordered
                pagination={false}
                columns={columnsFirst}
                dataSource={candidates.map(candidatesData => {
                  return {
                    key: candidatesData.id_candidate,
                    candidate: (
                      candidatesData.last_name +
                      " " +
                      candidatesData.first_name +
                      " " +
                      parties.map(partiesData => {
                        if (partiesData.id_party === candidatesData.party_id) {
                          return "(" + partiesData.name + ")";
                        }
                      })
                    )
                      .split(",")
                      .join(""),
                    firstVote: <Radio value={candidatesData.id_candidate} />
                  };
                })}
              />
            </Radio.Group>
          </Col>

          <Col span={12}>
            <Radio.Group id="radioSecondVote">
              <Table
                bordered
                pagination={false}
                columns={columnsSecond}
                dataSource={parties.map(partiesData => {
                  return {
                    key: partiesData.id_party,
                    partyName: partiesData.name + " (" + partiesData.text + ")",
                    secondVote: <Radio value={partiesData.id_party} />
                  };
                })}
              />
            </Radio.Group>
          </Col>
        </Row>
        <Row>
          <Checkbox>Stimme ungültig machen.</Checkbox>
        </Row>
        <Row>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                alert("Bitte bestätigen Sie Ihre Stimmabgabe.");
              }}
            >
              Stimme abgeben!
            </Button>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default ElectionVote;
