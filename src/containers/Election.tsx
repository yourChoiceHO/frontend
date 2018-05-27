import hoistNonReactStatics from "hoist-non-react-statics";
import React from "react";
import { Subscribe } from "unstated";

import Container from "@/containers/Container";
import api from "@/lib/api";
import { IElectionsContext } from "@/types/context";

class ElectionContainer extends Container<IElectionsContext> {
  public state: IElectionsContext = {
    election: {},
    elections: [],
    error: {},
    pending: false
  };

  public getAll = () => {
    this.setState({ pending: true });
    return api.election
      .getAll()
      .fork(
        error => this.setState({ error, pending: false }),
        elections => this.setState({ elections, pending: false, error: {} })
      );
  };

  public get = (id: number) => {
    return api.election
      .get(id)
      .fork(
        error => this.setState({ error, pending: false }),
        election => this.setState({ election, pending: false, error: {} })
      );
  };
}

export default ElectionContainer;
