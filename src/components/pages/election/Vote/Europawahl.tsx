import { Form, Radio, Table } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { Cancel } from "fluture";
import { isEmpty, pathOr } from "ramda";
import React, { Component } from "react";

import CandidateContainer from "@/containers/Candidate";
import connect from "@/containers/connect";
import PartyContainer from "@/containers/Party";
import { ICandidateEntity, IPartyEntity } from "@/types/model";
import { IVoteProps } from "@/types/props";
import { noop } from "@/utils";

const FormItem = Form.Item;

const columns = [
  {
    dataIndex: "partyName",
    key: "partyName",
    title: "Partei"
  },
  {
    dataIndex: "candidates",
    key: "candidates",
    title: "Kandidaten"
  },
  {
    dataIndex: "vote",
    key: "vote",
    title: "Stimme"
  }
];

const getPartiesDatasource = (
  parties: IPartyEntity[],
  candidates: ICandidateEntity[]
) => {
  return parties.map(({ id_party, name, text }) => {
    return {
      candidates: candidates
        .filter(({ party_id }) => party_id === id_party)
        .map(({ last_name, first_name }) => `${last_name} ${first_name}`),
      key: id_party,
      partyName: (
        <span>
          {name}
          <br />
          <small> ({text})</small>
        </span>
      ),
      vote: <Radio value={id_party} />
    };
  });
};

class Europawahl extends Component<
  IVoteProps &
    FormComponentProps & {
      candidates: CandidateContainer;
      parties: PartyContainer;
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
        <h2>Europawahl</h2>
        <FormItem>
          {getFieldDecorator("first-vote")(
            <Radio.Group>
              <Table
                bordered={true}
                columns={columns}
                dataSource={getPartiesDatasource(parties, candidates)}
                pagination={false}
              />
            </Radio.Group>
          )}
        </FormItem>
      </Form>
    );
  }
}

export default connect({
  candidates: CandidateContainer,
  parties: PartyContainer
})(Form.create()(Europawahl));
