import { Form, Input } from "antd";
import React, { Component } from "react";

import { FormComponentProps } from "antd/lib/form";

interface IVoterHashProps extends FormComponentProps {
  hash?: string;
}

const FormItem = Form.Item;

class VoterHashForm extends Component<IVoterHashProps> {
  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.props.onSubmit}>
        <FormItem>
          {getFieldDecorator("hash", {
            rules: [
              {
                message: "Bitte geben Sie Ihre Benutzerkennung an",
                required: true
              }
            ]
          })(<Input type="password" placeholder="Benutzerkennung" />)}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(VoterHashForm);
