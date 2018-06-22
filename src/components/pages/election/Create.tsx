import React, { Component, Fragment } from "react";

import ElectionCreateForm from "@/components/molecules/ElectionForm";
import connect from "@/containers/connect";
import ElectionContainer from "@/containers/Election";
import api from "@/lib/api";
import { ElectionTypes } from "@/types/model";
import moment from "@/utils/date";

const getInitialStartDate = () => moment().set({ h: 8, m: 0, s: 0 });
const getInitialEndDate = () =>
  moment()
    .set({ h: 18, m: 0, s: 0 })
    .add(14, "d");

class ElectionCreate extends Component {
  public state = {
    fields: {
      candidates: { value: null },
      end_date: { value: getInitialEndDate() },
      parties: { value: null },
      start_date: { value: getInitialStartDate() },
      text: { value: "" },
      topic: { value: null },
      typ: { value: ElectionTypes.Bundestagswahl },
      voters: { value: null }
    }
  };

  public onSubmit = values => {
    return api.election.create(values);
  };

  public onChange = changedFields => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields }
    }));
  };

  public render() {
    return (
      <Fragment>
        <h2>Wahl erstellen</h2>
        <ElectionCreateForm
          fields={this.state.fields}
          edit={false}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
        />
      </Fragment>
    );
  }
}

export default connect({
  election: ElectionContainer
})(ElectionCreate);
