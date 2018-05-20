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
// import CSSProperties= ;
import Moment from "moment";
import React, { Component, CSSProperties } from "react";

import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";
import { FormComponentProps } from "antd/lib/form";
// const election: IElectionEntity;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const format = "HH:mm";
/*const gridStyle = {
  textAlign: "center",
  width: "25%"
};*/
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
  public radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px"
  };

  public state = {
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
    const { getFieldDecorator } = this.props.form;
    return (
      <PageTemplate header={<Header />}>
        <div>Neue Wahl</div>
        <Form onSubmit={this.handleSubmit} layout="horizontal">
          <Card title="Wahl erstellen">
            <Row>
              <Col span={8}>
                <FormItem>
                  {getFieldDecorator("type", {
                    rules: [
                      { required: true, message: "Bitte Wahltyp auswählen!" }
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
              <Col span={8}>
                <FormItem>
                  {getFieldDecorator("start_date", {
                    rules: [
                      {
                        required: true,
                        message: "Bitte Startzeitpunkt festlegen!"
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
              <Col span={8}>
                <FormItem>
                  {getFieldDecorator("start_date", {
                    rules: [
                      {
                        required: true,
                        message: "Bitte Endzeitpunkt festlegen!"
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
                <FormItem>
                  {getFieldDecorator("start_date", {
                    rules: [
                      {
                        required: true,
                        message: "Bitte Wählerliste importieren!"
                      }
                    ]
                  })(
                    <Card.Grid style={gridStyle}>
                      {" "}
                      <Upload {...this.props.form}>
                        <Button>
                          <Icon type="upload" /> Wählerliste importieren
                        </Button>
                      </Upload>
                    </Card.Grid>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem>
                  {getFieldDecorator("start_date", {
                    rules: [
                      {
                        required: true,
                        message: "Bitte Parteienliste importieren!"
                      }
                    ]
                  })(
                    <Card.Grid style={gridStyle}>
                      {" "}
                      <Upload {...this.props.form}>
                        <Button>
                          <Icon type="upload" /> Parteienliste importieren
                        </Button>
                      </Upload>
                    </Card.Grid>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem>
                  {getFieldDecorator("start_date", {
                    rules: [
                      {
                        required: true,
                        message: "Bitte Kandidatenliste importieren!"
                      }
                    ]
                  })(
                    <Card.Grid style={gridStyle}>
                      {" "}
                      <Upload {...this.props.form}>
                        <Button>
                          <Icon type="upload" /> Kandidatenliste importieren
                        </Button>
                      </Upload>
                    </Card.Grid>
                  )}
                </FormItem>
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
