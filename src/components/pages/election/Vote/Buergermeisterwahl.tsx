import { Form, Radio, Row, Table } from "antd";
import { isEmpty, pathOr } from "ramda";
import React, { Component } from "react";

import CandidateContainer from "@/containers/Candidate";
import connect from "@/containers/connect";
import { ICandidateEntity } from "@/types/model";
import { IVoteProps } from "@/types/props";
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
  candidates.map(({ last_name, first_name, id_candidate }) => {
    return {
      candidate: (
        <span>
          {last_name}, {first_name}
        </span>
      ),
      firstVote: <Radio value={id_candidate} />,
      key: id_candidate
    };
  });

class Buergermeisterwahl extends Component<IVoteProps, {}> {
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
          {getFieldDecorator("candidate_id")(
            <Radio.Group id="radiovote">
              <Table
                bordered={true}
                pagination={false}
                columns={columns}
                dataSource={getCandidatesDatasource(candidates)}
              />
            </Radio.Group>
          )}
        </Row>
      </Form>
    );
  }
}

export default connect({
  candidates: CandidateContainer
})(Form.create()(Buergermeisterwahl));
