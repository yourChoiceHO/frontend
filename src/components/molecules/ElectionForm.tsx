import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Icon,
  Input,
  Radio,
  Row,
  Upload,
  message
} from "antd";

import connect from "@/containers/connect";

import AuthenticationContainer from "@/containers/Authentication";
import { ElectionStateTypes, ElectionTypes, Role } from "@/types/model";

import { FormComponentProps } from "antd/lib/form";
import classNames from "classnames/bind";
import Moment from "moment";
import { complement, not, or, reduce, pathOr, isEmpty, isNil } from "ramda";
import React, { Component } from "react";

import Styles from "@/components/pages/styles/hide.less";
import ElectionContainer from "@/containers/Election";
import { IElectionsContext } from "@/types/context";

const cx = classNames.bind(Styles);
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const format = "HH:mm";
// const Role: Role;

const isUnknown = or(isNil, isEmpty);
const isDefined = complement(isUnknown);

interface IUserFormProps extends FormComponentProps {
  election: ElectionContainer;
  id?: number;
  client_id: number;
  // end_date: Moment;
  id_election: number;
  // start_date: Moment;
  state: number;
  text: string;
  typ: { value: string };
  authentication: AuthenticationContainer;
}

const reduceWithOr = reduce<boolean, boolean>(or, false);

class ElectionForm extends Component<IUserFormProps> {
  public handleSubmit = (event: any) => {
    event.preventDefault();

    const role = this.props.authentication.getRole();
    const isSaved = pathOr(false, ["state", "created"], this.props.election);
    const isNew = !isSaved;
    let state = -1;

    if (role === Role.Supervisor) {
      state = ElectionStateTypes.Freigegeben;
    } else if (role === Role.Moderator) {
      state = ElectionStateTypes.Pruefung;
    }

    if (state !== -1) {
      this.props.form.setFieldsValue({
        state
      });
    }

    let fields = isNew
      ? ["typ", "start_date", "end_date", "text", "state"]
      : ["voters", "parties", "candidates", "topic"];

    if (this.isIdDefined()) {
      fields = ["typ", "start_date", "end_date", "text", "state"];
    }

    this.props.form.validateFields(fields, {}, (err, values) => {
      if (isDefined(err)) {
        console.log(err);
      } else {
        if (this.isIdDefined()) {
          this.props.election.update(this.props.id, values);
          this.props.onSave();
        } else {
          if (isNew) {
            this.props.election.create(values);
            this.props.onNext();
          }

          if (isSaved) {
            this.props.onSave();
          }
        }
      }
    });
  };

  public isIdDefined = () => isDefined(this.props.id);

  public render() {
    const {
      election: { state },
      form: { getFieldDecorator },
      ...props
    } = this.props;

    const type = props.typ.value;

    let isSaved = pathOr(false, ["created"], state);
    let isNew = !isSaved;
    let electionId = pathOr(-1, ["election", "id_election"], state);
    let buttonLabel = isNew ? "Weiter" : "Speichern";

    if (this.isIdDefined()) {
      isSaved = false;
      isNew = true;
      electionId = this.props.id;
      buttonLabel = "Änderungen speichern";
    }

    const isEuropawahl = type === ElectionTypes.Europawahl;
    const isBundestagswahl = type === ElectionTypes.Bundestagswahl;
    const isLandtagswahl = type === ElectionTypes.Landtagswahl;
    const isBuergermeisterwahl = type === ElectionTypes.Buergermeisterwahl;
    const isReferendum = type === ElectionTypes.Referendum;
    const isKommunalwahl = type === ElectionTypes.Kommunalwahl;
    const isLandtagswahlBW = type === ElectionTypes.LandtagswahlBW;
    const isLandtagswahlSL = type === ElectionTypes.LandtagswahlSL;

    const showPartyList = reduceWithOr([
      isEuropawahl,
      isBundestagswahl,
      isLandtagswahl,
      isLandtagswahlSL
    ]);

    const showCandidateList = reduceWithOr([
      isBundestagswahl,
      isLandtagswahl,
      isKommunalwahl,
      isBuergermeisterwahl,
      isLandtagswahlBW
    ]);

    const showTopicList = reduceWithOr([isReferendum]);

    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        <Card>
          <Row>
            <Col span={8}>
              <FormItem>
                <Card.Grid className={cx("grid")}>
                  {getFieldDecorator("typ", {
                    rules: [
                      {
                        message: "Bitte Wahltyp auswählen!",
                        required: true
                      }
                    ]
                  })(
                    <RadioGroup disabled={isSaved}>
                      <Radio
                        className={cx("radio")}
                        value={ElectionTypes.Europawahl}
                      >
                        Europawahl
                      </Radio>
                      <Radio
                        className={cx("radio")}
                        value={ElectionTypes.Bundestagswahl}
                      >
                        Bundestagswahl
                      </Radio>
                      <Radio
                        className={cx("radio")}
                        value={ElectionTypes.Landtagswahl}
                      >
                        Landtagswahl
                      </Radio>
                      <Radio
                        className={cx("radio")}
                        value={ElectionTypes.Buergermeisterwahl}
                      >
                        Bürgermeisterwahl
                      </Radio>
                      <Radio
                        className={cx("radio")}
                        value={ElectionTypes.Referendum}
                      >
                        Referendum
                      </Radio>
                      <Radio
                        className={cx("radio")}
                        value={ElectionTypes.Kommunalwahl}
                      >
                        Kommunalwahl
                      </Radio>
                      <Radio
                        className={cx("radio")}
                        value={ElectionTypes.LandtagswahlBW}
                      >
                        Landtagswahl (BW)
                      </Radio>
                      <Radio
                        className={cx("radio")}
                        value={ElectionTypes.LandtagswahlSL}
                      >
                        Landtagswahl (SL)
                      </Radio>
                    </RadioGroup>
                  )}
                </Card.Grid>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem>
                <Card.Grid className={cx("grid")}>
                  Endzeitpunkt
                  {getFieldDecorator("start_date", {
                    rules: [
                      {
                        message: "Bitte Startzeitpunkt festlegen!",
                        required: true
                      }
                    ]
                  })(
                    <DatePicker
                      disabled={isSaved}
                      format="YYYY-MM-DD HH:mm:ss"
                    />
                  )}
                </Card.Grid>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem>
                <Card.Grid className={cx("grid")}>
                  Endzeitpunkt
                  {getFieldDecorator("end_date", {
                    rules: [
                      {
                        message: "Bitte Endzeitpunkt festlegen!",
                        required: true
                      }
                    ]
                  })(
                    <DatePicker
                      disabled={isSaved}
                      format="YYYY-MM-DD HH:mm:ss"
                    />
                  )}
                </Card.Grid>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem>
              <Card.Grid className={cx("grid")}>
                {getFieldDecorator("text", {})(
                  <Input
                    disabled={isSaved}
                    placeholder="Weitere Informationen zur Wahl"
                  />
                )}
              </Card.Grid>
            </FormItem>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem>
                <Card.Grid className={cx("grid")}>
                  {getFieldDecorator("voters", {
                    rules: [
                      {
                        message: "Bitte Wählerliste importieren!",
                        required: true
                      }
                    ]
                  })(
                    <Upload
                      customRequest={this.props.election.addVoters(electionId)}
                      disabled={isNew}
                    >
                      <Button disabled={isNew} icon="upload">
                        Wählerliste importieren
                      </Button>
                    </Upload>
                  )}
                </Card.Grid>
              </FormItem>
            </Col>
            <Col span={8}>
              {showPartyList && (
                <FormItem>
                  <Card.Grid className={cx("grid")}>
                    {getFieldDecorator("parties", {
                      rules: [
                        {
                          message: "Bitte Parteienliste importieren!",
                          required: true
                        }
                      ]
                    })(
                      <Upload
                        customRequest={this.props.election.addParties(
                          electionId
                        )}
                        disabled={isNew}
                      >
                        <Button disabled={isNew} icon="upload">
                          Parteienliste importieren
                        </Button>
                      </Upload>
                    )}
                  </Card.Grid>
                </FormItem>
              )}
            </Col>
            <Col span={8}>
              {showCandidateList && (
                <FormItem>
                  <Card.Grid className={cx("grid")}>
                    {getFieldDecorator("candidates", {
                      rules: [
                        {
                          message: "Bitte Kandidatenliste importieren!",
                          required: true
                        }
                      ]
                    })(
                      <Upload
                        customRequest={this.props.election.addCandidates(
                          electionId
                        )}
                        disabled={isNew}
                      >
                        <Button disabled={isNew} icon="upload">
                          Kandidatenliste importieren
                        </Button>
                      </Upload>
                    )}
                  </Card.Grid>
                </FormItem>
              )}
              {showTopicList && (
                <FormItem>
                  <Card.Grid className={cx("grid")}>
                    {getFieldDecorator("topic", {
                      rules: [
                        {
                          message: "Bitte Themenliste importieren!",
                          required: true
                        }
                      ]
                    })(
                      <Upload
                        customRequest={this.props.election.addReferendums(
                          electionId
                        )}
                        disabled={isNew}
                      >
                        <Button disabled={isNew} icon="upload">
                          Themenliste importieren
                        </Button>
                      </Upload>
                    )}
                  </Card.Grid>
                </FormItem>
              )}
            </Col>
          </Row>
          <Row>
            <FormItem>
              {getFieldDecorator("state", {
                initialValue: this.props.state,
                rules: [
                  {
                    required: false
                  }
                ]
              })(<Input disabled={isSaved} type="hidden" />)}
            </FormItem>
            <Col push={16} span={8}>
              <Button type="primary" htmlType="submit">
                {buttonLabel}
              </Button>
            </Col>
          </Row>
        </Card>
      </Form>
    );
  }
}

const MyComponentToInjectAuth = Form.create({
  onFieldsChange(props: any, changedFields: any) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props: any) {
    return {
      candidates: Form.createFormField({
        ...props.candidates,
        value: props.candidates.value
      }),
      end_date: Form.createFormField({
        ...props.end_date,
        value: props.end_date.value
      }),
      parties: Form.createFormField({
        ...props.parties,
        value: props.parties.value
      }),
      start_date: Form.createFormField({
        ...props.start_date,
        value: props.start_date.value
      }),
      text: Form.createFormField({ ...props.text, value: props.text.value }),
      topic: Form.createFormField({ ...props.topic, value: props.topic.value }),
      typ: Form.createFormField({ ...props.typ, value: props.typ.value }),
      voters: Form.createFormField({
        ...props.voters,
        value: props.voters.value
      })
    };
  }
})(ElectionForm);

export default connect({
  authentication: AuthenticationContainer,
  election: ElectionContainer
})(MyComponentToInjectAuth);
