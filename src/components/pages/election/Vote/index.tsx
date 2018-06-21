import { Button, Checkbox, Form, message, Modal } from "antd";
import { Cancel } from "fluture";
import { isEmpty, isNil, pathOr } from "ramda";
import React, { Component, forwardRef, Fragment } from "react";

import ElectionContainer from "@/containers/Election";
import { ElectionTypes, IElectionEntity } from "@/types/model";

import VoterHashForm from "@/components/molecules/VoterHashForm";
import Buergermeisterwahl from "@/components/pages/election/Vote/Buergermeisterwahl";
import Bundestagswahl from "@/components/pages/election/Vote/Bundestagswahl";
import Europawahl from "@/components/pages/election/Vote/Europawahl";
import Kommunalwahl from "@/components/pages/election/Vote/Kommunalwahl";
import Landtagswahl from "@/components/pages/election/Vote/Landtagswahl";
import LandtagswahlBW from "@/components/pages/election/Vote/LandtagswahlBW";
import LandtagswahlSL from "@/components/pages/election/Vote/LandtagswahlSL";
import Referendum from "@/components/pages/election/Vote/Referendum";
import { FormComponentProps } from "antd/lib/form";

import connect from "@/containers/connect";
import { isUnknown, noop } from "@/utils";

const Vote = forwardRef(({ election }: { election: IElectionEntity }, ref) => {
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

    case ElectionTypes.LandtagswahlBW:
      VoteComponent = LandtagswahlBW;
      break;

    case ElectionTypes.LandtagswahlSL:
      VoteComponent = LandtagswahlSL;
      break;

    case ElectionTypes.Referendum:
      VoteComponent = Referendum;
      break;

    default:
      return null;
  }

  return <VoteComponent election={election} ref={ref} />;
});

const HashForm = forwardRef(({ onSubmit }, ref) => {
  return <VoterHashForm onSubmit={onSubmit} ref={ref} />;
});

const FormItem = Form.Item;

class ElectionVote extends Component<
  { election: ElectionContainer } & FormComponentProps
> {
  public state = {
    isVisible: false
  };

  private formRef;
  private hashFormRef;
  private cancel: Cancel = noop;

  public componentDidMount() {
    this.cancel = this.props.election.get(this.props.computedMatch.params.id);
    this.formRef = React.createRef();
    this.hashFormRef = React.createRef();
  }

  public componentDidUpdate() {
    const result = pathOr({}, ["state", "result"], this.props.election);
    const pending = pathOr(false, ["state", "pending"], this.props.election);
    const status = pathOr(
      -1,
      ["state", "error", "response", "status"],
      this.props.election
    );

    if (!pending && status === 403) {
      message.error("Ungültige Benutzerkennung!");
      this.hashFormRef.current.resetFields();
      this.hashFormRef.current.validateFields();
    } else if (!pending && !isEmpty(result)) {
      message.success("Stimme wurde erfolgreich abgegeben!");
      this.props.election.reset();
      this.props.history.replace(this.props.match.url);
    }
  }

  public componentWillUnmount() {
    this.cancel();
  }

  public onVote({ invalid, ...payload }) {
    let defaultPayload = {
      first_vote: true,
      second_vote: true,
      voter_id: null,
      candidate_id: null,
      party_id: null,
      referendum: null,
      valid: false
    };

    const valid = !invalid;
    const electionId = this.props.computedMatch.params.id;

    this.props.election.vote(electionId, {
      ...defaultPayload,
      ...payload,
      valid,
      voter_id: this.props.authentication.getId()
    });
  }

  public onSubmit = event => {
    event.preventDefault();
    this.handleOnOk();
  };

  public handleOnOk = () => {
    this.props.election.resetError();

    this.formRef.current.validateFields((baseFormErrors, baseFormValues) =>
      this.props.form.validateFields(
        (electionFormErrors, electionFormValues) => {
          if (isUnknown(baseFormErrors) && isUnknown(electionFormErrors)) {
            this.setState(
              () => ({
                isVisible: true
              }),
              () => {
                setTimeout(() => {
                  this.hashFormRef.current.validateFields(
                    (hashFormErrors, hashFormValues) => {
                      if (isUnknown(hashFormErrors)) {
                        const payload = {
                          ...baseFormValues,
                          ...electionFormValues,
                          ...hashFormValues
                        };

                        this.onVote(payload);
                      }
                    }
                  );
                }, 0);
              }
            );
          }
        }
      )
    );
  };

  public handleOnCancel = () => {
    this.setState({ isVisible: false });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;

    const election = pathOr({}, ["state", "election"], this.props.election);
    const pending = pathOr(false, ["state", "pending"], this.props.election);

    if (isEmpty(election)) {
      return null;
    }

    return (
      <Fragment>
        <h2>{election.typ}</h2>
        <h3>{election.text}</h3>
        <Vote ref={this.formRef} election={election} onSubmit={this.onVote} />

        <Form onSubmit={this.onSubmit}>
          <Button type="primary" htmlType="submit">
            Abstimmen
          </Button>
          <FormItem>
            {getFieldDecorator("invalid", { initialValue: false })(
              <Checkbox>Stimme ungültig machen</Checkbox>
            )}
          </FormItem>
        </Form>

        <Modal
          confirmLoading={pending}
          title="Wahl bestätigen"
          visible={this.state.isVisible}
          onOk={this.handleOnOk}
          onCancel={this.handleOnCancel}
          cancelText="Nein"
          okText="Ja"
        >
          <p>
            Bitte bestätigen Sie die Abgabe Ihrer Stimme. Hierzu wird Ihre
            Benutzerkennung benötigt
          </p>
          <HashForm ref={this.hashFormRef} />
        </Modal>
      </Fragment>
    );
  }
}

export default connect({
  election: ElectionContainer
})(Form.create()(ElectionVote));
