import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row, Button, Modal, DatePicker } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import {
  useGetAllTenantsQuery,
  useRemoveTenantMutation,
} from "../../apiSlices/tenantApiSlice";
import { handleShowAlert } from "../../utils/commonHelper";

const { confirm } = Modal;

const TenantList = () => {
  //misc
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //queries n mutation
  const { data: getAllTenants, isLoading: getAllTenantsLoading } =
    useGetAllTenantsQuery();
  const [removeTenant, { isLoading: removeTenantLoading }] =
    useRemoveTenantMutation();

  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const showConfirm = (tenantId) => {
    let localSelectedEndDate = null;

    confirm({
      title: "Are you sure you want to remove this tenant?",
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <p>This action cannot be undone</p>
          <DatePicker
            onChange={(date, dateString) => {
              localSelectedEndDate = dateString;
            }}
          />
        </>
      ),
      onOk() {
        removeTenantHandler(tenantId, localSelectedEndDate);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const removeTenantHandler = async (tenantId, endDate) => {
    // console.log({
    //   tenantId,
    //   data: {
    //     endDate,
    //   },
    // });
    const payload = {
      tenantId,
      data: {
        endDate,
      },
    };

    try {
      const res = await removeTenant(payload).unwrap();
      console.log(res, " resss");
      handleShowAlert(dispatch, "success", res?.message);
    } catch (err) {
      handleShowAlert(dispatch, "error", err?.data?.message);
      console.log(err, " errr");
    }
  };

  const handleCardClick = (tenantId) => {
    navigate(`/edittenant/${tenantId}`); // Navigate to edit tenant route with tenantId
  };

  if (getAllTenantsLoading || removeTenantLoading) return <div>Loading...</div>;

  return (
    <div className="tenant_list_container">
      <h1 onClick={() => console.log({ selectedEndDate })}>Tenant List</h1>
      <Row gutter={16}>
        {getAllTenants?.tenants?.map((tenant) => (
          <Col span={8} key={tenant._id}>
            <Card
              title={`Tenant: ${tenant.personalDetails.name}`}
              bordered={false}
              extra={
                <Button type="danger" onClick={() => showConfirm(tenant._id)}>
                  Remove
                </Button>
              }
            >
              {/* Tenant details */}
              <Card
                title={`Tenant: ${tenant.personalDetails.name}`}
                bordered={false}
                onClick={() => handleCardClick(tenant._id)} // Add onClick event to Card
                style={{ cursor: "pointer" }} // Optional: change cursor on hover
              >
                <p>Room Name: {tenant.room.name}</p>
                <p>Room Type: {tenant.room.roomType}</p>
                <p>Actual Price: {tenant.room.actualPrice}</p>
                <p>Final Price: {tenant.room.finalPrice}</p>
                <p>Father's Name: {tenant.personalDetails.fatherName}</p>
                <p>Adults: {tenant.personalDetails.numberOfAdults}</p>
                <p>Children: {tenant.personalDetails.numberOfChildren}</p>
                <p>Advance Payment: {tenant.advancePayment}</p>
              </Card>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TenantList;
