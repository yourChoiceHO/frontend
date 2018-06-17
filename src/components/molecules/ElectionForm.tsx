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
  Upload
} from "antd";

import connect from "@/containers/connect";

import AuthenticationContainer from "@/containers/Authentication";
import { ElectionTypes } from "@/types/model";

import { FormComponentProps } from "antd/lib/form";
import classNames from "classnames/bind";
import Moment from "moment";
import { not, or, reduce } from "ramda";
import React, { Component } from "react";

import Styles from "@/components/pages/styles/hide.less";

const cx = classNames.bind(Styles);
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const format = "HH:mm";
// const Role: Role;

interface IUserFormProps extends FormComponentProps {
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
    if (role === 1) {
      this.props.form.setFieldsValue({
        state: 2
      });
    } else if (role === 2) {
      this.props.form.setFieldsValue({
        state: 1
      });
    }

    this.props.form.validateFields((err, values) => {
      console.log({ err, values });
    });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;

    // const isEuropawahl = this.props.typ.value === "1";
    // const isBundestagswahl = this.props.typ.value === "Bundestagswahl";
    // const isLandtagswahl = this.props.typ.value === "3";
    // const isLandratswahl = this.props.typ.value === "4";
    // const isBürgerentscheid = this.props.typ.value === "5";
    // const isGemeinderatswahl = this.props.typ.value === "6";
    // const isBürgermeisterwahl = this.props.typ.value === "7";

    const isEuropawahl = this.props.typ.value === "Europawahl";
    const isBundestagswahl = this.props.typ.value === "Bundestagswahl";
    const isLandtagswahl = this.props.typ.value === "Landtagswahl";
    const isBuergermeisterwahl = this.props.typ.value === "Buergermeisterwahl";
    const isReferendum = this.props.typ.value === "Referendum";
    const isKommunalwahl = this.props.typ.value === "Kommunalwahl";
    const isLandtagswahlBW = this.props.typ.value === "LandtagswahlBW";
    const isLandtagswahlSL = this.props.typ.value === "LandtagswahlSL";

    const hidePartyList = not(
      reduceWithOr([isEuropawahl, isBundestagswahl, isLandtagswahl])
    );

    const hideCandidateList = not(
      reduceWithOr([
        isBundestagswahl,
        isLandtagswahl,
        // isLandratswahl,
        isKommunalwahl,
        isBuergermeisterwahl
      ])
    );

    const hideTopicList = not(reduceWithOr([isReferendum]));

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
                    <RadioGroup>
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
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="Select Time"
                      showTime={{
                        defaultValue: Moment("8:00", format),
                        format
                      }}
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
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="Select Time"
                      showTime={{
                        defaultValue: Moment("8:00", format),
                        format
                      }}
                    />
                  )}
                </Card.Grid>
              </FormItem>
            </Col>
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
                    <Upload>
                      <Button>
                        <Icon type="upload" /> Wählerliste importieren
                      </Button>
                    </Upload>
                  )}
                </Card.Grid>
              </FormItem>
            </Col>
            <Col span={8}>
              {!hidePartyList && (
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
                      <Upload>
                        <Button>
                          <Icon type="upload" /> Parteienliste importieren
                        </Button>
                      </Upload>
                    )}
                  </Card.Grid>
                </FormItem>
              )}
            </Col>
            <Col span={8}>
              {!hideCandidateList && (
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
                      <Upload>
                        <Button>
                          <Icon type="upload" /> Kandidatenliste importieren
                        </Button>
                      </Upload>
                    )}
                  </Card.Grid>
                </FormItem>
              )}
              {!hideTopicList && (
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
                      <Upload>
                        <Button>
                          <Icon type="upload" />Themenliste importieren
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
              <Card.Grid className={cx("grid")}>
                {getFieldDecorator("text", {})(
                  <Input placeholder="Weitere Informationen zur Wahl" />
                )}
              </Card.Grid>
            </FormItem>
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
              })(<Input type="hidden" />)}
            </FormItem>
            <Col push={16} span={8}>
              <Button type="dashed" htmlType="reset">
                Abbrechen
              </Button>
              <Button type="primary" htmlType="submit">
                Speichern
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
  authentication: AuthenticationContainer
})(MyComponentToInjectAuth);
