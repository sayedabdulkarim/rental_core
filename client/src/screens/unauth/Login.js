import React from "react";
import { Form, Input, Button, Card } from "antd";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../apiSlices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { handleShowAlert } from "../../utils/commonHelper";
import { setPropertiesList } from "../../slices/propertySlice";

const Login = ({ onToggle }) => {
  //misc
  const dispatch = useDispatch();

  //queries n mutation
  const [loginUser, { isLoading: loginLoading, error: loginError }] =
    useLoginMutation();

  const onFinish = async (values) => {
    // console.log("Received values of form: ", values);
    const { phone } = values;

    try {
      const res = await loginUser({
        phone,
      }).unwrap();
      console.log(res, " resss");
      localStorage.setItem("jwtToken", res.token);
      handleShowAlert(dispatch, "success", res?.message);
      dispatch(setCredentials({ ...res }));
      dispatch(setPropertiesList(res?.data?.rooms || []));

      // navigate("/");
    } catch (err) {
      handleShowAlert(dispatch, "error", err?.data?.message);
      console.log(err, " errr");
    }
  };

  return (
    <Card title="Login">
      <Form name="login" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
            {
              pattern: new RegExp(/^[0-9]{10}$/),
              message: "Please enter a valid 10-digit phone number!",
            },
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { type: "email", message: "The input is not valid E-mail!" },
            { required: true, message: "Please input your E-mail!" },
          ]}
        >
          <Input placeholder="Email" />
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
