import { Button, Form, Icon, Input } from "antd";
import React, { Component, FormEvent } from "react";

import { IFormProps } from "@/types/props";

const FormItem = Form.Item;

interface IUserLoginFormProps extends IFormProps {
  username?: string;
  password?: string;
}

class UserLoginForm extends Component<IUserLoginFormProps, {}> {
  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator("username", {
            rules: [
              {
                message: "Bitte geben Sie Ihren Benutzernamen an.",
                required: true
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" />}
              type="text"
              placeholder="Benutzername"
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

export default Form.create()(UserLoginForm);
