import { Button, Card } from "antd";
import { Cancel } from "fluture";
import moment from "moment";
import { isEmpty, pathOr } from "ramda";
import React, { Component, Fragment } from "react";

import connect from "@/containers/connect";
import ElectionContainer from "@/containers/Election";

const ButtonGroup = Button.Group;

class ElectionDetail extends Component<{ election: ElectionContainer }> {
  public componentDidMount() {
    this.cancel = this.props.election.get(this.props.computedMatch.params.id);
  }

  public componentWillUnmount() {
    this.cancel();
  }

  public render() {
    const election = pathOr({}, ["state", "election", 0], this.props.election);

    if (isEmpty(election)) {
      return <div />;
    }

    return (
      <Fragment>
        <div style={{ background: "#ECECEC", padding: "30px" }}>
          <Card title={election.type} bordered={true}>
            <p>{election.text}</p>
            <p>Wahl ID: {election.id_election}</p>
            <p>Client ID: {election.client_id}</p>
            <p>Zustand: {election.state}</p>
            <p>startet am: {moment(election.start_date).format("LLL")}</p>
            <p>endet am: {moment(election.end_date).format("LLL")}</p>
          </Card>
        </div>
        <div>
          <Button>Bearbeiten</Button>
          <ButtonGroup style={{ padding: "30px" }}>
            <Button>Speichern</Button>
            <Button>Abbrechen</Button>
          </ButtonGroup>
        </div>
      </Fragment>
    );
  }

  private cancel: Cancel = () => {};
}

export default connect({
  election: ElectionContainer
})(ElectionDetail);
