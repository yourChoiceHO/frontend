// Nur Parteien

// Nur Kandidaten

import { Col, Form, Radio, Row, Table } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { isEmpty, pathOr } from "ramda";
import React, { Component } from "react";

import { IPartyEntity } from "@/types/model";
import { IVoteProps } from "@/types/props";

import connect from "@/containers/connect";
import PartyContainer from "@/containers/Party";
import { noop } from "@/utils";

const columns = [
  {
    dataIndex: "partyName",
    key: "partyName",
    title: "Partei"
  },
  {
    dataIndex: "firstVote",
    key: "firstVote",
    title: "Stimme"
  }
];

const getPartiesDatasource = (parties: IPartyEntity[]) =>
  parties.map(({ id_party, name }) => ({
    firstVote: <Radio value={id_party} />,
    key: id_party,
    partyName: <span>{name}</span>
  }));

const FormItem = Form.Item;

class LandtagswahlSL extends Component<IVoteProps & FormComponentProps, {}> {
  private cancelParty = noop;

  public componentDidMount() {
    this.cancelParty = this.props.parties.getByElection(
      this.props.election.id_election
    );
  }

  public componentWillUnmount() {
    this.cancelParty();
  }

  public render() {
    const parties = pathOr<IPartyEntity[]>(
      [],
      ["state", "parties"],
      this.props.parties
    );

    const { getFieldDecorator } = this.props.form;

    if (isEmpty(parties)) {
      return <div />;
    }

    return (
      <Form>
        <Row>
          <Col span={12}>
            <FormItem>
              {getFieldDecorator("party_id")(
                <Radio.Group id="radioSecondVote">
                  <Table
                    bordered={true}
                    columns={columns}
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
  parties: PartyContainer
})(Form.create()(LandtagswahlSL));
