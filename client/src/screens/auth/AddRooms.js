import React from "react";
import { Form, Input, InputNumber, Button } from "antd";

const AddRooms = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <Form form={form} layout="vertical" name="addRoomsForm" onFinish={onFinish}>
      {["1rk", "1bhk", "2bhk"].map((roomType) => (
        <React.Fragment key={roomType}>
          <h3>{roomType.toUpperCase()} Section</h3>
          <Form.Item
            name={`${roomType}Count`}
            label="Room Count"
            rules={[
              {
                required: true,
                message: `Please input the count for ${roomType.toUpperCase()} rooms!`,
              },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name={`${roomType}Rent`}
            label="Rent"
            rules={[{ required: true, message: "Please input the rent!" }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name={`${roomType}Description`} label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={`${roomType}EquipmentDetails`}
            label="Equipment Details"
          >
            <Input />
          </Form.Item>
        </React.Fragment>
      ))}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddRooms;
