import React from "react";
import { Form, Input, InputNumber, Button, Select } from "antd";

const AddTenant = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values from form: ", values);
    // Submit these values to your backend here
  };

  return (
    <div className="tenant_container">
      <h1>Add Tenant</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* Room details */}
        <Form.Item
          name="roomType"
          label="Room Type"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select room type">
            {/* Populate these options based on available room types */}
            <Select.Option value="1bhk">1BHK</Select.Option>
            <Select.Option value="2bhk">2BHK</Select.Option>
            {/* ... other room types */}
          </Select>
        </Form.Item>

        <Form.Item
          name="actualPrice"
          label="Actual Price"
          rules={[{ required: true }]}
        >
          <InputNumber placeholder="Actual Price" />
        </Form.Item>

        <Form.Item
          name="finalPrice"
          label="Final Price"
          rules={[{ required: true }]}
        >
          <InputNumber placeholder="Final Price" />
        </Form.Item>

        {/* Advance payment */}
        <Form.Item
          name="advancePayment"
          label="Advance Payment"
          rules={[{ required: true }]}
        >
          <InputNumber placeholder="Advance Payment" />
        </Form.Item>

        {/* Personal details */}
        <Form.Item
          name="personalDetails.name"
          label="Tenant Name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Tenant Name" />
        </Form.Item>

        <Form.Item
          name="personalDetails.fatherName"
          label="Father's Name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Father's Name" />
        </Form.Item>

        <Form.Item
          name="personalDetails.numberOfAdults"
          label="Number of Adults"
          rules={[{ required: true }]}
        >
          <InputNumber placeholder="Number of Adults" />
        </Form.Item>

        <Form.Item
          name="personalDetails.numberOfChildren"
          label="Number of Children"
        >
          <InputNumber placeholder="Number of Children" />
        </Form.Item>

        <Form.Item
          name="personalDetails.aadhaarCardNumber"
          label="Aadhaar Card Number"
          rules={[{ required: true }]}
        >
          <Input placeholder="Aadhaar Card Number" />
        </Form.Item>

        {/* Submit button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Tenant
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddTenant;
