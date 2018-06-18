// Nur Kandidaten

import { Col, Form, Radio, Row, Table } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { find, isEmpty, pathOr, propEq, propOr } from "ramda";
import React, { Component } from "react";

import { ICandidateEntity, IPartyEntity } from "@/types/model";
import { IVoteProps } from "@/types/props";

import CandidateContainer from "@/containers/Candidate";
import connect from "@/containers/connect";
import PartyContainer from "@/containers/Party";
import { noop } from "@/utils";

const columns = [
  {
    dataIndex: "candidate",
    key: "candidate",
    title: "Kandidat"
  },
  {
    dataIndex: "firstVote",
    key: "firstVote",
    title: "Stimme"
  }
];

const getCandidatesDatasource = (candidates: ICandidateEntity[]) =>
  candidates.map(({ last_name, first_name, id_candidate }) => ({
    candidate: (
      <span>
        {last_name}, {first_name}
      </span>
    ),
    firstVote: <Radio value={id_candidate} />,
    key: id_candidate
  }));

const FormItem = Form.Item;

class LandtagswahlBW extends Component<IVoteProps & FormComponentProps, {}> {
  private cancelCandidate = noop;

  public componentDidMount() {
    this.cancelCandidate = this.props.candidates.getByElection(
      this.props.election.id_election
    );
  }

  public componentWillUnmount() {
    this.cancelCandidate();
  }

  public render() {
    const candidates = pathOr<ICandidateEntity[]>(
      [],
      ["state", "candidates"],
      this.props.candidates
    );

    const { getFieldDecorator } = this.props.form;

    if (isEmpty(candidates)) {
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
                    columns={columns}
                    dataSource={getCandidatesDatasource(candidates)}
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
  candidates: CandidateContainer
})(Form.create()(LandtagswahlBW));
