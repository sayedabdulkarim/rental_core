import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, InputNumber, Button } from "antd";
import { useGetTenantByIDQuery } from "../../apiSlices/tenantApiSlice";

const EditTenant = () => {
  const { tenantId } = useParams();
  const [form] = Form.useForm();
  const {
    data: tenantData,
    isLoading,
    isError,
    error,
  } = useGetTenantByIDQuery(tenantId);

  useEffect(() => {
    if (tenantData) {
      // Set form fields with tenant data
      form.setFieldsValue({
        "personalDetails.name": tenantData.tenant.personalDetails.name,
        "personalDetails.fatherName":
          tenantData.tenant.personalDetails.fatherName,
        "personalDetails.numberOfAdults":
          tenantData.tenant.personalDetails.numberOfAdults,
        "personalDetails.numberOfChildren":
          tenantData.tenant.personalDetails.numberOfChildren,
        "personalDetails.aadhaarCardNumber":
          tenantData.tenant.personalDetails.aadhaarCardNumber,
        advancePayment: tenantData.tenant.advancePayment,
      });
    }
  }, [tenantData, form]);

  const handleSubmit = (values) => {
    console.log(values);
    // Handle form submission here
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div>Error: {error?.data?.message || "An error occurred"}</div>;

  return (
    <div className="edit_tenant_container">
      <h1>Edit Tenant</h1>

      {/* Room Details Section (Non-editable) */}
      <div className="room_details">
        <h2>Room Details</h2>
        <p>Room Name: {tenantData?.roomDetails.name}</p>
        <p>Room Type: {tenantData?.tenant.room.roomType}</p>
        <p>Rent: {tenantData?.roomDetails.details.rent}</p>
        <p>Description: {tenantData?.roomDetails.details.description}</p>
        {/* Add more room details if needed */}
      </div>

      {/* Tenant Details Form */}
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="personalDetails.name" label="Tenant Name">
          <Input />
        </Form.Item>
        <Form.Item name="personalDetails.fatherName" label="Father's Name">
          <Input />
        </Form.Item>
        <Form.Item
          name="personalDetails.numberOfAdults"
          label="Number of Adults"
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="personalDetails.numberOfChildren"
          label="Number of Children"
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="personalDetails.aadhaarCardNumber"
          label="Aadhaar Card Number"
        >
          <Input />
        </Form.Item>
        <Form.Item name="advancePayment" label="Advance Payment">
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Tenant
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditTenant;
