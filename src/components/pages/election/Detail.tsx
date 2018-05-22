import { Cancel } from "fluture";
import React, { Component } from "react";

import ElectionContainer, { withElection } from "@/containers/Election";

class ElectionDetail extends Component<{ election: ElectionContainer }> {
  public componentDidMount() {
    this.cancel = this.props.election.get(this.props.computedMatch.params.id);
  }

  public componentWillUnmount() {
    this.cancel();
  }

  public render() {
    return <div>Wahl Details</div>;
  }

  private cancel: Cancel = () => {};
}

export default withElection(ElectionDetail);
