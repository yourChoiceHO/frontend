import { Col, Form, Radio, Row, Table } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { Cancel } from "fluture";
import { find, isEmpty, path, propEq, propOr } from "ramda";
import React, { Component } from "react";

import { ICandidateEntity, IPartyEntity } from "@/types/model";
import { IVoteProps } from "@/types/props";

import CandidateContainer from "@/containers/Candidate";
import connect from "@/containers/connect";
import PartyContainer from "@/containers/Party";

const columnsFirst = [
  {
    dataIndex: "candidate",
    key: "candidate",
    title: "Kandidat"
  },
  {
    dataIndex: "firstVote",
    key: "firstVote",
    title: "Erststimme"
  }
];

const columnsSecond = [
  {
    dataIndex: "partyName",
    key: "partyName",
    title: "Partei"
  },
  {
    dataIndex: "secondVote",
    key: "secondVote",
    title: "Zweitstimme"
  }
];

const getCandidatesDatasource = (
  candidates: ICandidateEntity[],
  parties: IPartyEntity[]
) =>
  candidates.map(({ party_id, last_name, first_name, id_candidate }) => {
    const partyName = propOr(
      "N/A",
      "name_1",
      find(propEq("id_party", party_id), parties)
    );

    return {
      candidate: (
        <span>
          {last_name}, {first_name}
          <br />
          <small> ({partyName})</small>
        </span>
      ), 
      firstVote: <Radio value={id_candidate} />,
      key: id_candidate
    };
  });

const getPartiesDatasource = (parties: IPartyEntity[]) =>
  parties.map(({ id_party, name_1, text }) => ({
    key: id_party,
    partyName: (
      <span>
        {name_1}
        <br />
        <small> ({text})</small>
      </span>
    ),
    secondVote: <Radio value={id_party} />
  }));

const FormItem = Form.Item;

class Landtagswahl extends Component<IVoteProps & FormComponentProps, {}> {
  public componentDidMount() {
    this.cancelCandidate = this.props.candidates.getByElection(
      this.props.election.id_election
    );
    this.cancelParty = this.props.parties.getByElection(
      this.props.election.id_election
    );
  }

  public componentWillUnmount() {
    this.cancelCandidate();
    this.cancelParty();
  }

  public render() {
    const candidates = path(["state", "candidates"], this.props.candidates);
    const parties = path(["state", "parties"], this.props.parties);

    const { getFieldDecorator } = this.props.form;

    if (isEmpty(candidates) || isEmpty(parties)) {
      return <div />;
    }

    return (
      <Form>
        <h2>Landtagswahl</h2>
        <Row>
          <Col span={12}>
            <FormItem>
              {getFieldDecorator("first-vote")(
                <Radio.Group id="radioFirstVote">
                  <Table
                    bordered={true}
                    columns={columnsFirst}
                    dataSource={getCandidatesDatasource(candidates, parties)}
                    pagination={false}
                  />
                </Radio.Group>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem>
              {getFieldDecorator("second-vote")(
                <Radio.Group id="radioSecondVote">
                  <Table
                    bordered={true}
                    columns={columnsSecond}
                    dataSource={getPartiesDatasource(parties)}
                    pagination={false}
                  />
                </Radio.Group>
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }

  private cancelCandidate: Cancel = () => {};
  private cancelParty: Cancel = () => {};
}

export default connect({
  candidates: CandidateContainer,
  parties: PartyContainer
})(Form.create()(Landtagswahl));
