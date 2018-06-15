import moment from "moment";
import { isEmpty, mapObjIndexed, pathOr } from "ramda";
import React, { Component, Fragment } from "react";

import ElectionEditForm from "@/components/molecules/ElectionForm";
import connect from "@/containers/connect";
import ElectionContainer from "@/containers/Election";
import { noop } from "@/utils";

class ElectionEdit extends Component {
  public static getDerivedStateFromProps(props, state) {
    const election = pathOr({}, ["state", "election", 0], props.election);
    const id = pathOr(Infinity, ["id_election"], election);

    if (!isEmpty(election) && state.previousId !== id) {
      return {
        fields: mapObjIndexed((field, name) => {
          let value = props.election.state.election[0][name];

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
      topic: { value: null },
      type: { value: "Bundestagswahl" },
      text: { value: "" },
      voters: { value: null }
    },
    previousId: Infinity
  };

  private cancel = noop;

  public componentDidMount() {
    this.cancel = this.props.election.get(this.props.computedMatch.params.id);
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
    const election = pathOr({}, ["state", "election", 0], this.props.election);

    if (isEmpty(election)) {
      return <div />;
    }

    return (
      <Fragment>
        <h2>Wahl bearbeiten</h2>
        <ElectionEditForm {...this.state.fields} onChange={this.onChange} />
      </Fragment>
    );
  }
}

export default connect({
  election: ElectionContainer
})(ElectionEdit);
