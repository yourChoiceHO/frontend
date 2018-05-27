import hoistNonReactStatics from "hoist-non-react-statics";
import React from "react";
import { Subscribe } from "unstated";

import Container from "@/containers/Container";
import api from "@/lib/api";
import { ICandidateContext } from "@/types/context";

class CandidateContainer extends Container<ICandidateContext> {
  public state: ICandidateContext = {
    error: {},
    candidates: [],
    pending: false
  };

  public getByElection = (id: number) => {
    return api.candidate
      .getByElection(id)
      .fork(
        error => this.setState({ error, pending: false }),
        candidates => this.setState({ candidates, error: {}, pending: false })
      );
  };
}

export default CandidateContainer;
