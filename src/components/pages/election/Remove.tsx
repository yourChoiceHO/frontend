import { message, Popconfirm } from "antd";
import { Cancel } from "fluture";
import { isEmpty, pathOr } from "ramda";
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import connect from "@/containers/connect";
import ElectionContainer from "@/containers/Election";
import { noop } from "@/utils";

class ElectionRemove extends Component<{ election: ElectionContainer }> {
  private cancel: Cancel = noop;

  public componentDidMount() {
    this.cancel = this.props.election.get(this.props.computedMatch.params.id);
  }

  public componentWillUnmount() {
    this.cancel();
  }

  public confirmPop(e: any) {
    const election = pathOr({}, ["state", "election", 0], this.props.election);

    console.log(election);
    // this.props.election.remove(election.id_election);
    // election.remove(election.id_election);
    message.success("Wahl gelöscht");
  }

  public cancelPop(e: any) {
    message.warning("Vorgang abgebrochen");
  }

  public render() {
    const election = pathOr({}, ["state", "election", 0], this.props.election);
    if (isEmpty(election)) {
      return <div />;
    }

    return (
      <Popconfirm
        title="Sind Sie sicher, dass Sie diese Wahl löschen wollen?"
        onConfirm={this.confirmPop}
        onCancel={this.cancelPop}
        okText="Ja"
        cancelText="Nein"
      >
        <a href="#">Löschen</a>
      </Popconfirm>
    );
  }
}

export default connect({
  election: ElectionContainer
})(ElectionRemove);
