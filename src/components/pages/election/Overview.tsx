import { Cancel } from "fluture";
import React, { Component } from "react";

import ElectionContainer, { withElection } from "@/containers/Election";

class ElectionOverview extends Component<{ election: ElectionContainer }> {
  public componentDidMount() {
    this.cancel = this.props.election.getAll();
  }

  public componentWillUnmount() {
    this.cancel();
  }

  public render() {
    return <div>Wahl Übersicht</div>;
  }

  private cancel: Cancel = () => {};
}

export default withElection(ElectionOverview);
