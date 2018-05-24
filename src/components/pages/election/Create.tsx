import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Icon,
  Radio,
  Row,
  TimePicker,
  Upload
} from "antd";
import classNames from "classnames/bind";
import Moment from "moment";
import React, { Component, CSSProperties } from "react";

import Styles from "@/components/pages/styles/hidden_and_show.less";

import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";
import { FormComponentProps } from "antd/lib/form";
const cx = classNames.bind(Styles);
// const election: IElectionEntity;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const format = "HH:mm";
const gridStyle: CSSProperties = {
  textAlign: "justify",
  width: "100%"
};
interface IUserFormProps extends FormComponentProps {
  client_id: number;
  // end_date: Moment.format;
  id_election: number;
  // start_date: Moment;
  state: number;
  text: string;
  type: string;
}
class ElectionCreatePage extends Component<IUserFormProps, {}> {
  public state = {
    hidden: 0,
    value: 1
  };
  public handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // <br> test </br>;
    });
  };
  public onChange = (e: any) => {
    this.setState({
      value: e.target.value
    });
  };
  public render() {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };

    if (this.state.value === 2 || this.state.value === 3) {
      const e2 = document.getElementsByClassName(cx("hidden2"))[0];
      if (e2) {
        e2.className = cx("show2");
      }

      const e3 = document.getElementsByClassName(cx("hidden3"))[0];
      if (e3) {
        e3.className = cx("show3");
      }
      const e4 = document.getElementsByClassName(cx("show4"))[0];
      if (e4 != null) {
        e4.className = cx("hidden4");
      }
    } else if (
      this.state.value === 4 ||
      this.state.value === 6 ||
      this.state.value === 7
    ) {
      const e2 = document.getElementsByClassName(cx("show2"))[0];

      if (e2) {
        e2.className = cx("hidden2");
      }
      const e3 = document.getElementsByClassName(cx("hidden3"))[0];
      if (e3) {
        e3.className = cx("show3");
      }
      const e4 = document.getElementsByClassName(cx("show4"))[0];
      if (e4 != null) {
        e4.className = cx("hidden4");
      }
    } else if (this.state.value === 1) {
      const e2 = document.getElementsByClassName(cx("hidden2"))[0];
      if (e2 != null) {
        e2.className = cx("show2");
      }
      const e3 = document.getElementsByClassName(cx("show3"))[0];
      if (e3 != null) {
        e3.className = cx("hidden3");
      }
      const e4 = document.getElementsByClassName(cx("show4"))[0];
      if (e4 != null) {
        e4.className = cx("hidden4");
      }
    } else if (this.state.value === 5) {
      const e2 = document.getElementsByClassName(cx("show2"))[0];
      if (e2 != null) {
        e2.className = cx("hidden2");
      }
      const e3 = document.getElementsByClassName(cx("show3"))[0];
      if (e3 != null) {
        e3.className = cx("hidden3");
      }
      const e4 = document.getElementsByClassName(cx("hidden4"))[0];
      if (e4 != null) {
        e4.className = cx("show4");
      }
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <PageTemplate header={<Header />}>
        <Form onSubmit={this.handleSubmit} layout="horizontal">
          <Card title="Wahl erstellen">
            <Row>
              <Col span={8} className={cx("std")}>
                <FormItem>
                  {getFieldDecorator("type", {
                    rules: [
                      {
                        message: "Bitte Wahltyp auswählen!",
                        required: true
                      }
                    ]
                  })(
                    <Card.Grid style={gridStyle}>
                      <RadioGroup
                        onChange={this.onChange}
                        value={this.state.value}
                      >
                        <Radio style={radioStyle} value={1}>
                          Europawahl
                        </Radio>
                        <Radio style={radioStyle} value={2}>
                          Bundestagswahl
                        </Radio>
                        <Radio style={radioStyle} value={3}>
                          Landtagswahl
                        </Radio>
                        <Radio style={radioStyle} value={4}>
                          Landratswahl;
                        </Radio>
                        <Radio style={radioStyle} value={5}>
                          Bürgerentscheid;
                        </Radio>
                        <Radio style={radioStyle} value={6}>
                          Gemeinderatswahl;
                        </Radio>
                        <Radio style={radioStyle} value={7}>
                          Bürgermeisterwahl;
                        </Radio>
                      </RadioGroup>
                    </Card.Grid>
                  )}
                </FormItem>
              </Col>
              <Col span={8} className={cx("std")}>
                <FormItem>
                  {getFieldDecorator("start_date", {
                    rules: [
                      {
                        message: "Bitte Startzeitpunkt festlegen!",
                        required: true
                      }
                    ]
                  })(
                    <Card.Grid style={gridStyle}>
                      Startzeitpunkt
                      <DatePicker onChange={this.onChange} />
                      <TimePicker
                        defaultValue={Moment("8:00", format)}
                        format={format}
                      />
                    </Card.Grid>
                  )}
                </FormItem>
              </Col>
              <Col span={8} className={cx("std")}>
                <FormItem>
                  {getFieldDecorator("end_date", {
                    rules: [
                      {
                        message: "Bitte Endzeitpunkt festlegen!",
                        required: true
                      }
                    ]
                  })(
                    <Card.Grid style={gridStyle}>
                      Endzeitpunkt
                      <DatePicker onChange={this.onChange} />
                      <TimePicker
                        defaultValue={Moment("8:00", format)}
                        format={format}
                      />
                    </Card.Grid>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <div className={cx("show1")}>
                  <FormItem>
                    {getFieldDecorator("voters", {
                      rules: [
                        {
                          message: "Bitte Wählerliste importieren!",
                          required: true
                        }
                      ]
                    })(
                      <Card.Grid style={gridStyle}>
                        <Upload {...this.props.form}>
                          <Button>
                            <Icon type="upload" /> Wählerliste importieren
                          </Button>
                        </Upload>
                      </Card.Grid>
                    )}
                  </FormItem>
                </div>
              </Col>

              <Col span={8}>
                <div className={cx("show2")}>
                  <FormItem>
                    {getFieldDecorator("parties", {
                      rules: [
                        {
                          message: "Bitte Parteienliste importieren!",
                          required: true
                        }
                      ]
                    })(
                      <Card.Grid style={gridStyle}>
                        <Upload {...this.props.form}>
                          <Button>
                            <Icon type="upload" /> Parteienliste importieren
                          </Button>
                        </Upload>
                      </Card.Grid>
                    )}
                  </FormItem>
                </div>
              </Col>

              <Col span={8}>
                <div className={cx("hidden3")}>
                  <FormItem>
                    {getFieldDecorator("candidats", {
                      rules: [
                        {
                          message: "Bitte Kandidatenliste importieren!",
                          required: true
                        }
                      ]
                    })(
                      <Card.Grid style={gridStyle}>
                        <Upload {...this.props.form}>
                          <Button>
                            <Icon type="upload" /> Kandidatenliste importieren
                          </Button>
                        </Upload>
                      </Card.Grid>
                    )}
                  </FormItem>
                </div>
                <div className={cx("hidden4")}>
                  <FormItem>
                    {getFieldDecorator("topic", {
                      rules: [
                        {
                          message: "Bitte Themenliste importieren!",
                          required: true
                        }
                      ]
                    })(
                      <Card.Grid style={gridStyle}>
                        <Upload {...this.props.form}>
                          <Button>
                            <Icon type="upload" />Themenliste importieren
                          </Button>
                        </Upload>
                      </Card.Grid>
                    )}
                  </FormItem>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={8} />
              <Col span={8} />
              <Col span={8}>
                <FormItem>
                  <Button
                    type="dashed"
                    htmlType="reset"
                    className="election-reset-button"
                  >
                    Abbrechen
                  </Button>
                </FormItem>
                <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="election-confirm-button"
                  >
                    Speichern
                  </Button>
                </FormItem>
              </Col>
            </Row>
          </Card>{" "}
        </Form>
      </PageTemplate>
    );
  }
}
const Wrapelection = Form.create()(ElectionCreatePage);

export default Wrapelection;
