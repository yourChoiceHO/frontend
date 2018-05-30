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
                message: "Bitte geben Sie Ihren Hash an.",
                required: true
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" />}
              type="password"
              placeholder="Hash"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="Password"
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
