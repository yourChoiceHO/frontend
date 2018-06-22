import Future from "fluture";
import { isEmpty, mapObjIndexed, pathOr } from "ramda";
import React, { Component, Fragment } from "react";

import ElectionEditForm from "@/components/molecules/ElectionForm";
import CandidateContainer from "@/containers/Candidate";
import connect from "@/containers/connect";
import ElectionContainer from "@/containers/Election";
import PartyContainer from "@/containers/Party";
import ReferendumContainer from "@/containers/Referendum";
import api from "@/lib/api";
import { noop } from "@/utils";
import moment from "@/utils/date";

class ElectionEdit extends Component<{
  candidate: CandidateContainer;
  election: ElectionContainer;
  party: PartyContainer;
  referendum: ReferendumContainer;
}> {
  public static getDerivedStateFromProps(props, state) {
    const election = state.election;
    const id = pathOr(Infinity, ["id_election"], election);

    if (!isEmpty(election) && state.previousId !== id) {
      return {
        fields: mapObjIndexed((field, name) => {
          let value = election[name];

          if (name === "start_date" || name === "end_date") {
            value = moment(value);
          }

          return {
            ...field,
            value
          };
        }, state.fields),
        previousId: id
      };
    }

    return null;
  }

  public state = {
    fields: {
      candidates: { value: null },
      end_date: { value: null },
      parties: { value: null },
      start_date: { value: null },
      text: { value: "" },
      topic: { value: null },
      typ: { value: -1 },
      voters: { value: null }
    },
    previousId: Infinity,
    pending: false,
    election: {},
    constituencies: {}
  };

  private cancel = noop;

  public onSubmit = values => {
    const id = parseInt(this.props.computedMatch.params.id, 10);
    return api.election.update(id, values);
  };

  public componentDidMount() {
    this.fetchData();
  }

  public fetchData() {
    const id = parseInt(this.props.computedMatch.params.id, 10);
    const electionTask = api.election.get(id);
    const constituenciesTask = api.election.byConstituency(id);

    this.setState({ pending: true });
    this.cancel = Future.both(electionTask, constituenciesTask).fork(
      console.error,
      ([election, constituencies]) =>
        this.setState({ election, constituencies, pending: false })
    );
  }

  public componentWillUnmount() {
    this.cancel();
  }

  public onChange = changedFields => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields }
    }));
  };

  public render() {
    const { constituencies, election, pending } = this.state;
    const id = parseInt(this.props.computedMatch.params.id, 10);

    if (pending) {
      return "";
    }

    if (isEmpty(election)) {
      return <div />;
    }

    return (
      <Fragment>
        <h2>Wahl bearbeiten</h2>
        <ElectionEditForm
          fields={this.state.fields}
          constituencies={constituencies}
          id={id}
          edit={true}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
        />
      </Fragment>
    );
  }
}

export default connect({
  candidate: CandidateContainer,
  election: ElectionContainer,
  party: PartyContainer,
  referendum: ReferendumContainer
})(ElectionEdit);
