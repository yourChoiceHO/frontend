import { Col, Form, Radio, Row, Table } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { find, isEmpty, path, propEq, propOr } from "ramda";
import React, { Component } from "react";

import { ICandidateEntity, IPartyEntity } from "@/types/model";
import { IVoteProps } from "@/types/props";

import CandidateContainer from "@/containers/Candidate";
import connect from "@/containers/connect";
import PartyContainer from "@/containers/Party";
import { noop } from "@/utils";

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px"
};

const columnsFirst = [
  {
    dataIndex: "candidate",
    key: "candidate",
    title: "Kandidaten"
  },
  {
    dataIndex: "voteOne",
    key: "voteOne",
    title: "Stimme(n)"
  }
];

const columnsSecond = [
  {
    dataIndex: "partyName",
    key: "partyName",
    title: "Parteien"
  },
  {
    dataIndex: "secondVote",
    key: "secondVote",
    title: "Für alle Stimmen"
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
      key: id_candidate,
      voteOne: (
        <Radio.Group>
          <Radio style={radioStyle} value={`${id_candidate}_1`}>
            1
          </Radio>
          <Radio style={radioStyle} value={`${id_candidate}_2`}>
            2
          </Radio>
          <Radio style={radioStyle} value={`${id_candidate}_3`}>
            3
          </Radio>
        </Radio.Group>
      )
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

class Kommunalwahl extends Component<IVoteProps & FormComponentProps, {}> {
  private cancelCandidate = noop;
  private cancelParty = noop;

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
    const candidates = path<ICandidateEntity[]>(
      ["state", "candidates"],
      this.props.candidates
    );
    const parties = path<IPartyEntity[]>(
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
                <Radio.Group>
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
                <Radio.Group>
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
})(Form.create()(Kommunalwahl));
