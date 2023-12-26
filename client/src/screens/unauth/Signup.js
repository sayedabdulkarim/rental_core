import React from "react";
import { Form, Input, Button, Card } from "antd";
import { useDispatch } from "react-redux";
import { useRegisterUserMutation } from "../../apiSlices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { handleShowAlert } from "../../utils/commonHelper";

const Signup = ({ onToggle }) => {
  //misc
  const dispatch = useDispatch();

  //queries n mutation
  const [registerUser, { isLoading: registerLoading, error: registerError }] =
    useRegisterUserMutation();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    const { name, email, phone } = values;

    try {
      const res = await registerUser({
        name,
        email,
        phone,
      }).unwrap();
      console.log(res, " resss");
      localStorage.setItem("jwtToken", res.token);
      handleShowAlert(dispatch, "success", res?.message);
      dispatch(setCredentials({ ...res }));
      // navigate("/");
    } catch (err) {
      handleShowAlert(dispatch, "error", err?.data?.message);
      console.log(err, " errr");
    }
  };

  return (
    <Card title="Signup">
      <Form name="signup" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
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
