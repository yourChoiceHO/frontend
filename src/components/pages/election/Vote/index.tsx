import { Button, Checkbox, Form, Modal } from "antd";
import { Cancel } from "fluture";
import { isEmpty, pathOr } from "ramda";
import React, { Component, forwardRef } from "react";

import ElectionContainer from "@/containers/Election";
import { ElectionTypes } from "@/types/model";

import Buergermeisterwahl from "@/components/pages/election/Vote/Buergermeisterwahl";
import Bundestagswahl from "@/components/pages/election/Vote/Bundestagswahl";
import Europawahl from "@/components/pages/election/Vote/Europawahl";
import Kommunalwahl from "@/components/pages/election/Vote/Kommunalwahl";
import Landtagswahl from "@/components/pages/election/Vote/Landtagswahl";
import Referendum from "@/components/pages/election/Vote/Referendum";
import { FormComponentProps } from "antd/lib/form";

import connect from "@/containers/connect";
import { noop } from "@/utils";

const Vote = forwardRef(({ election }, ref) => {
  let VoteComponent;

  switch (election.typ) {
    case ElectionTypes.Buergermeisterwahl:
      VoteComponent = Buergermeisterwahl;
      break;

    case ElectionTypes.Bundestagswahl:
      VoteComponent = Bundestagswahl;
      break;

    case ElectionTypes.Europawahl:
      VoteComponent = Europawahl;
      break;

    case ElectionTypes.Kommunalwahl:
      VoteComponent = Kommunalwahl;
      break;

    case ElectionTypes.Landtagswahl:
      VoteComponent = Landtagswahl;
      break;

    case ElectionTypes.Referendum:
      VoteComponent = Referendum;
      break;

    default:
      return null;
  }

  return <VoteComponent election={election} ref={ref} />;
});

const FormItem = Form.Item;

class ElectionVote extends Component<
  { election: ElectionContainer } & FormComponentProps
> {
  private formRef;
  private cancel: Cancel = noop;

  public componentDidMount() {
    this.cancel = this.props.election.get(this.props.computedMatch.params.id);
    this.formRef = React.createRef();
  }

  public componentWillUnmount() {
    this.cancel();
  }

  public onVote({ error, values }) {
    console.log({ error, values });
  }

  public onSubmit = event => {
    event.preventDefault();

    this.showWarning()
      .then(() => {
        this.formRef.current.validateFields((error, values) =>
          this.onVote({ error, values })
        );

        this.props.form.validateFields((error, values) =>
          this.onVote({ error, values })
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;

    const election = pathOr({}, ["state", "election"], this.props.election);

    if (isEmpty(election)) {
      return null;
    }

    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <h2>
            Interaktiver Stimmzettel für die {election.type} im {election.text}
          </h2>
          <FormItem>
            {getFieldDecorator("invalidate")(
              <Checkbox>Stimme ungültig machen.</Checkbox>
            )}
          </FormItem>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
        <Vote ref={this.formRef} election={election} onSubmit={this.onVote} />
      </div>
    );
  }

  private showWarning() {
    return new Promise((resolve, reject) => {
      const modal = Modal.confirm({
        cancelText: "Nein",
        content: "Bitte...",
        okText: "Ja",
        onCancel: () => {
          reject();
          return modal.destroy();
        },
        onOk: () => {
          resolve();
          return modal.destroy();
        },
        title: "Wahl bestätigen"
      });
    });
  }
}

export default connect({
  election: ElectionContainer
})(Form.create()(ElectionVote));
