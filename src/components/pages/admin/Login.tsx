import React, { SFC } from "react";
import { Form, Icon, Input, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";

import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";
import AuthenticationContainer, {
  withAuthentication
} from "@/containers/Authentication";
import { Redirect } from "react-router";

const FormItem = Form.Item;

interface IUserFormProps extends FormComponentProps {
  username?: string;
  password?: string;
}

class UserForm extends React.Component<IUserFormProps, any> {
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
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }

  private handleSubmit = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

    this.props.form.validateFields((error, values) => {
      this.props.onSubmit({ error, values });
    });
  };
}

const LoginForm = Form.create()(UserForm);

const AdminLoginPage: SFC<{ authentication: AuthenticationContainer }> = ({
  authentication
}) => {
  const onSubmit = ({ error, values }) => {
    if (error) {
      authentication.setError(error);
    } else {
      authentication.login(values);
    }
  };

  if (authentication.isLoggedIn()) {
    return <Redirect to="/" />;
  }

  return (
    <PageTemplate header={<Header />}>
      <h2>Admin</h2>
      <LoginForm onSubmit={onSubmit} />
    </PageTemplate>
  );
};

export default withAuthentication(AdminLoginPage);
