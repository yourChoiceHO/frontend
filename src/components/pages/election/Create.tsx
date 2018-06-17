import moment from "moment";
import React, { Component, Fragment } from "react";

import ElectionCreateForm from "@/components/molecules/ElectionForm";
import connect from "@/containers/connect";
import ElectionContainer from "@/containers/Election";
import { ElectionTypes } from "@/types/model";

class ElectionCreate extends Component {
  public state = {
    fields: {
      candidates: { value: null },
      end_date: { value: moment() },
      parties: { value: null },
      start_date: { value: moment() },
      text: { value: "" },
      topic: { value: null },
      typ: { value: ElectionTypes.Bundestagswahl },
      voters: { value: null }
    }
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
        <ElectionCreateForm {...this.state.fields} onChange={this.onChange} />
      </Fragment>
    );
  }
}

export default connect({
  election: ElectionContainer
})(ElectionCreate);
