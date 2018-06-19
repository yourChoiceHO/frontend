import { Button, Card } from "antd";
import { Cancel } from "fluture";
import moment from "moment";
import { isEmpty, pathOr } from "ramda";
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import Can from "@/components/atoms/Can";
import connect from "@/containers/connect";
import ElectionContainer from "@/containers/Election";
import { ElectionStates } from "@/types/model";
import { noop } from "@/utils";

class ElectionDetail extends Component<{ election: ElectionContainer }> {
  private cancel: Cancel = noop;

  public componentDidMount() {
    this.cancel = this.props.election.get(this.props.computedMatch.params.id);
  }

  public componentWillUnmount() {
    this.cancel();
  }

  public render() {
    const election = pathOr({}, ["state", "election"], this.props.election);
    const pending = pathOr({}, ["state", "pending"], this.props.election);
    const type = election.typ;

    if (pending) {
      return "";
    }

    if (isEmpty(election)) {
      return <div />;
    }

    return (
      <Fragment>
        <div style={{ background: "#ECECEC", padding: "30px" }}>
          <Card title={election.typ} bordered={true}>
            <p>{election.text}</p>
            <p>Wahl ID: {election.id_election}</p>
            <p>Client ID: {election.client_id}</p>
            <p>Zustand: {election.state}</p>
            <p>startet am: {moment(election.start_date).format("LLL")}</p>
            <p>endet am: {moment(election.end_date).format("LLL")}</p>
          </Card>
        </div>
        <div>
          <Can do="edit" on="Election">
            {() =>
              type !== ElectionStates.ImGange && (
                <Link to={`/wahl/${election.id_election}/bearbeiten`}>
                  <Button icon="edit" type="primary">
                    Bearbeiten
                  </Button>
                </Link>
              )
            }
          </Can>

          <Can do="delete" on="Election">
            {() =>
              type !== ElectionStates.ImGange && (
                <Link to={`/wahl/${election.id_election}/entfernen`}>
                  <Button icon="delete" type="primary">
                    Löschen
                  </Button>
                </Link>
              )
            }
          </Can>
        </div>
      </Fragment>
    );
  }
}

export default connect({
  election: ElectionContainer
})(ElectionDetail);
