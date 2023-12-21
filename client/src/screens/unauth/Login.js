import React from "react";
import { Form, Input, Button, Card } from "antd";

const Login = ({ onToggle }) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Card title="Login">
      <Form name="login" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <Button type="link" onClick={onToggle}>
            Signup
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
