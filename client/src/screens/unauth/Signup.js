import React from "react";
import { Form, Input, Button, Card } from "antd";
import { phoneValidator } from "../../utils/commonHelper";

const Signup = ({ onToggle }) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Card title="Signup">
      <Form name="signup" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
            {
              validator: (_, value) =>
                value && /^\d{10}$/.test(value)
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("Please input a valid 10-digit phone number!")
                    ),
            },
          ]}
        >
          <Input placeholder="Phone Number" maxLength={10} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Signup
          </Button>
          <Button type="link" onClick={onToggle}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Signup;
