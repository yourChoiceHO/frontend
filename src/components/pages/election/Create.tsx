import { message } from "antd";
import React, { Component, Fragment } from "react";

import ElectionCreateForm from "@/components/molecules/ElectionForm";
import connect from "@/containers/connect";
import ElectionContainer from "@/containers/Election";
import { ElectionTypes } from "@/types/model";

import moment from "@/utils/date";

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

  public onNext = () => {
    message.success("Wahl wurde erfolgreich angelegt");
  };

  public onSave = () => {
    message.success("Wahl wurde erfolgreich erstellt");
    this.props.history.replace(this.props.match.url);
  };

  public render() {
    return (
      <Fragment>
        <h2>Wahl erstellen</h2>
        <ElectionCreateForm
          {...this.state.fields}
          onChange={this.onChange}
          onNext={this.onNext}
          onSave={this.onSave}
        />
      </Fragment>
    );
  }
}

export default connect({
  election: ElectionContainer
})(ElectionCreate);
