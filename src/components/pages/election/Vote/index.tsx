import { Button, Checkbox, Form, message, Modal } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { Cancel } from "fluture";
import { pathOr } from "ramda";
import React, { Component, forwardRef, Fragment } from "react";

import Vote from "@/components/atoms/Vote";
import VoterHashForm from "@/components/molecules/VoterHashForm";
import connect from "@/containers/connect";
import ElectionContainer from "@/containers/Election";
import { isDefined, isUnknown, noop } from "@/utils";

const HashForm = forwardRef(({ onSubmit }, ref) => {
  return <VoterHashForm onSubmit={onSubmit} ref={ref} />;
});

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
    } else if (!pending && isDefined(result)) {
      message.success("Stimme wurde erfolgreich abgegeben!");
      this.props.election.reset();
      this.props.history.replace(this.props.match.url);
    }
  }

  public componentWillUnmount() {
    this.cancel();
  }

  public onVote({ invalid, ...payload }) {
    const valid = !invalid;
    const electionId = this.props.computedMatch.params.id;

    const defaultPayload = {
      candidate_id: null,
      first_vote: true,
      party_id: null,
      referendum: null,
      second_vote: true,
      valid: false,
      voter_id: null
    };

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

    if (isUnknown(election)) {
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
          <Form.Item>
            {getFieldDecorator("invalid", { initialValue: false })(
              <Checkbox>Stimme ungültig machen</Checkbox>
            )}
          </Form.Item>
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
