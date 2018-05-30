import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Icon,
  Radio,
  Row,
  Upload
} from "antd";
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

interface IUserFormProps extends FormComponentProps {
  client_id: number;
  // end_date: Moment.format;
  id_election: number;
  // start_date: Moment;
  state: number;
  text: string;
  type: string;
}

const reduceWithOr = reduce<boolean, boolean>(or, false);

class ElectionForm extends Component<IUserFormProps> {
  public handleSubmit = (event: any) => {
    event.preventDefault();

    this.props.form.validateFields((err, values) => {
      console.log({ err, values });
    });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;

    const isEuropawahl = this.props.type.value === "1";
    const isBundestagswahl = this.props.type.value === "Bundestagswahl";
    const isLandtagswahl = this.props.type.value === "3";
    const isLandratswahl = this.props.type.value === "4";
    const isBürgerentscheid = this.props.type.value === "5";
    const isGemeinderatswahl = this.props.type.value === "6";
    const isBürgermeisterwahl = this.props.type.value === "7";

    const hidePartyList = not(
      reduceWithOr([isEuropawahl, isBundestagswahl, isLandtagswahl])
    );

    const hideCandidateList = not(
      reduceWithOr([
        isBundestagswahl,
        isLandtagswahl,
        isLandratswahl,
        isGemeinderatswahl,
        isBürgermeisterwahl
      ])
    );

    const hideTopicList = not(reduceWithOr([isBürgerentscheid]));

    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        <Card>
          <Row>
            <Col span={8}>
              <FormItem>
                <Card.Grid className={cx("grid")}>
                  {getFieldDecorator("type", {
                    rules: [
                      {
                        message: "Bitte Wahltyp auswählen!",
                        required: true
                      }
                    ]
                  })(
                    <RadioGroup>
                      <Radio className={cx("radio")} value={"1"}>
                        Europawahl
                      </Radio>
                      <Radio className={cx("radio")} value={"Bundestagswahl"}>
                        Bundestagswahl
                      </Radio>
                      <Radio className={cx("radio")} value={"3"}>
                        Landtagswahl
                      </Radio>
                      <Radio className={cx("radio")} value={"4"}>
                        Landratswahl
                      </Radio>
                      <Radio className={cx("radio")} value={"5"}>
                        Bürgerentscheid
                      </Radio>
                      <Radio className={cx("radio")} value={"6"}>
                        Gemeinderatswahl
                      </Radio>
                      <Radio className={cx("radio")} value={"7"}>
                        Bürgermeisterwahl
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
              <FormItem className={cx({ hide: hidePartyList })}>
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
            </Col>
            <Col span={8}>
              <FormItem className={cx({ hide: hideCandidateList })}>
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
              <FormItem className={cx({ hide: hideTopicList })}>
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
            </Col>
          </Row>
          <Row>
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

export default Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
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
      topic: Form.createFormField({ ...props.topic, value: props.topic.value }),
      type: Form.createFormField({ ...props.type, value: props.type.value }),
      voters: Form.createFormField({
        ...props.voters,
        value: props.voters.value
      })
    };
  }
})(ElectionForm);

/* <Radio.Group>
<Radio style={radioStyle} value={0}>
  Europawahl
</Radio>
<Radio style={radioStyle} value={1}>
  Bundestagswahl
</Radio>
<Radio style={radioStyle} value={2}>
  Landtagswahl
</Radio>
<Radio style={radioStyle} value={3}>
  Bürgerentscheid
</Radio>
<Radio style={radioStyle} value={4}>
  Bürgermeisterwahl
</Radio>
<Radio style={radioStyle} value={5}>
  Gemeinderatswahl
</Radio>
</Radio.Group> */
