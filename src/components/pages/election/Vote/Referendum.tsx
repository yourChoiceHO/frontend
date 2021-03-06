import { Form, Radio, Row } from "antd";
import { isEmpty, pathOr } from "ramda";
import React, { Component } from "react";

import { IReferendumEntity } from "@/types/model";
import { IVoteProps } from "@/types/props";

import connect from "@/containers/connect";
import ReferendumContainer from "@/containers/Referendum";
import { noop } from "@/utils";

class Referendum extends Component<IVoteProps, {}> {
  private cancel = noop;

  public componentDidMount() {
    this.cancel = this.props.referendums.getByElection(
      this.props.election.id_election
    );
  }

  public componentWillUnmount() {
    this.cancel();
  }

  public render() {
    const { getFieldDecorator } = this.props.form;

    const referendum = pathOr<IReferendumEntity>(
      {},
      ["state", "referendums", 0],
      this.props.referendums
    );

    if (isEmpty(referendum)) {
      return <div />;
    }

    return (
      <Form>
        <h4>{referendum.text}</h4>
        <Row>
          {getFieldDecorator("referendum")(
            <Radio.Group>
              <Radio value={"yes"}>Ja</Radio>
              <Radio value={"no"}>Nein</Radio>
            </Radio.Group>
          )}
        </Row>
      </Form>
    );
  }
}

export default connect({
  referendums: ReferendumContainer
})(Form.create()(Referendum));
