import { Col, Form, Radio, Row, Table } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { Cancel } from "fluture";
import { find, isEmpty, pathOr, propEq, propOr } from "ramda";
import React, { Component } from "react";

import { ICandidateEntity, IPartyEntity } from "@/types/model";
import { IVoteProps } from "@/types/props";

import CandidateContainer from "@/containers/Candidate";
import connect from "@/containers/connect";
import PartyContainer from "@/containers/Party";
import { noop } from "@/utils";

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
      "name",
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
  parties.map(({ id_party, name, text }) => ({
    key: id_party,
    partyName: (
      <span>
        {name}
        <br />
        <small> ({text})</small>
      </span>
    ),
    secondVote: <Radio value={id_party} />
  }));

const FormItem = Form.Item;

class Bundestagswahl extends Component<
  IVoteProps &
    FormComponentProps & {
      parties: PartyContainer;
      candidates: CandidateContainer;
    },
  {}
> {
  private cancelCandidate: Cancel = noop;
  private cancelParty: Cancel = noop;

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
    const candidates = pathOr<ICandidateEntity[]>(
      [],
      ["state", "candidates"],
      this.props.candidates
    );
    const parties = pathOr<IPartyEntity[]>(
      [],
      ["state", "parties"],
      this.props.parties
    );

    const { getFieldDecorator } = this.props.form;

    if (isEmpty(candidates) || isEmpty(parties)) {
      return <div />;
    }

    return (
      <Form>
        <Row>
          <Col span={12}>
            <FormItem>
              {getFieldDecorator("candidate_id")(
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
              {getFieldDecorator("party_id")(
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
}

export default connect({
  candidates: CandidateContainer,
  parties: PartyContainer
})(Form.create()(Bundestagswahl));
