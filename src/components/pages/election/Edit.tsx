import { message } from "antd";
import { isEmpty, mapObjIndexed, pathOr } from "ramda";
import React, { Component, Fragment } from "react";

import ElectionEditForm from "@/components/molecules/ElectionForm";
import connect from "@/containers/connect";
import ElectionContainer from "@/containers/Election";

import { noop } from "@/utils";
import moment from "@/utils/date";

class ElectionEdit extends Component {
  public static getDerivedStateFromProps(props, state) {
    const election = pathOr({}, ["state", "election"], props.election);
    const id = pathOr(Infinity, ["id_election"], election);

    if (!isEmpty(election) && state.previousId !== id) {
      return {
        fields: mapObjIndexed((field, name) => {
          let value = props.election.state.election[name];

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
    previousId: Infinity
  };

  private cancel = noop;

  public componentDidMount() {
    this.fetchElection();
  }

  public componentWillUnmount() {
    this.cancel();
  }

  public fetchElection() {
    this.cancel = this.props.election.get(this.props.computedMatch.params.id);
  }

  public onChange = changedFields => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields }
    }));
  };

  public onSave = () => {
    message.success("Wahl wurde erfolgreich bearbeitet");
    this.fetchElection();
  };

  public render() {
    const id = parseInt(this.props.computedMatch.params.id, 10);
    const election = pathOr({}, ["state", "election"], this.props.election);
    const pending = pathOr({}, ["state", "pending"], this.props.election);

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
          id={id}
          {...this.state.fields}
          onChange={this.onChange}
          onSave={this.onSave}
        />
      </Fragment>
    );
  }
}

export default connect({
  election: ElectionContainer
})(ElectionEdit);
