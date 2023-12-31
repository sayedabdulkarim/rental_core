import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Input, InputNumber, Button } from "antd";
import {
  useEditTenantMutation,
  useGetTenantByIDQuery,
} from "../../apiSlices/tenantApiSlice";
import { handleShowAlert } from "../../utils/commonHelper";

const EditTenant = () => {
  //misc
  const dispatch = useDispatch();
  const { tenantId } = useParams();
  const [form] = Form.useForm();
  const {
    data: tenantData,
    isLoading,
    isError,
    error,
  } = useGetTenantByIDQuery(tenantId);

  //queries n mutation
  const [editTenant, { isLoading: editTenantLoading, error: editTenantError }] =
    useEditTenantMutation();

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

  const handleSubmit = async (values) => {
    console.log(values);
    // Construct payload with only modified fields
    const payload = {
      tenantId: tenantId,
      data: {
        personalDetails: {
          name: values["personalDetails.name"],
          fatherName: values["personalDetails.fatherName"],
          numberOfAdults: values["personalDetails.numberOfAdults"],
          numberOfChildren: values["personalDetails.numberOfChildren"],
          aadhaarCardNumber: values["personalDetails.aadhaarCardNumber"],
        },
        advancePayment: values.advancePayment,
      },
    };

    try {
      const res = await editTenant(payload).unwrap();
      console.log(res, " resss");
      handleShowAlert(dispatch, "success", res?.message);
    } catch (err) {
      handleShowAlert(dispatch, "error", err?.data?.message);
      console.log(err, " errr");
    }
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
