import { Button, Form, Icon, Input } from "antd";
import React, { Component, FormEvent } from "react";

import { IFormProps } from "@/types/props";

const FormItem = Form.Item;

interface IVoterLoginFormProps extends IFormProps {
  hash?: string;
  password?: string;
}

class VoterLoginForm extends Component<IVoterLoginFormProps, {}> {
  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator("hash", {
            rules: [
              {
                message: "Bitte geben Sie Ihre Benutzerkennung an",
                required: true
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" />}
              type="password"
              placeholder="Benutzerkennung"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [
              { required: true, message: "Bitte geben Sie Ihr Passwort an" }
            ]
          })(
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="Passwort"
            />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Anmelden
          </Button>
        </FormItem>
      </Form>
    );
  }

  private handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.form.validateFields(this.props.onSubmit);
  };
}

export default Form.create()(VoterLoginForm);
