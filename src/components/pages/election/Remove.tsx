import { Button, message, Popconfirm } from "antd";
import { Cancel } from "fluture";
import { isEmpty, pathOr } from "ramda";
import React, { Component } from "react";

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

  public confirmPop = (e: any) => {
    const electionId = this.props.computedMatch.params.id;
    message.success("Wahl gelöscht!");
    this.props.election.remove(electionId);
  };

  public cancelPop(e: any) {
    message.warning("Vorgang abgebrochen");
  }

  public render() {
    const election = pathOr({}, ["state", "election"], this.props.election);
    const pending = pathOr({}, ["state", "pending"], this.props.election);

    if (pending) {
      return "";
    }

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
        <Button type="primary" href="#">
          Löschen
        </Button>
      </Popconfirm>
    );
  }
}

export default connect({
  election: ElectionContainer
})(ElectionRemove);
