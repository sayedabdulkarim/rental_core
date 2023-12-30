import React, { useEffect } from "react";
import { Card, Col, Row } from "antd";
import { useGetAllTenantsQuery } from "../../apiSlices/tenantApiSlice";

const TenantList = () => {
  // RTK Query hook
  const { data: getAllTenants, isLoading: getAllTenantsLoading } =
    useGetAllTenantsQuery();

  if (getAllTenantsLoading) return <div>Loading...</div>;

  return (
    <div className="tenant_list_container">
      <h1>Tenant List</h1>
      <Row gutter={16}>
        {getAllTenants?.tenants?.map((tenant) => (
          <Col span={8} key={tenant._id}>
            <Card
              title={`Tenant: ${tenant.personalDetails.name}`}
              bordered={false}
            >
              <p>Room Type: {tenant.room.roomType}</p>
              <p>Actual Price: {tenant.room.actualPrice}</p>
              <p>Final Price: {tenant.room.finalPrice}</p>
              <p>Father's Name: {tenant.personalDetails.fatherName}</p>
              <p>Adults: {tenant.personalDetails.numberOfAdults}</p>
              <p>Children: {tenant.personalDetails.numberOfChildren}</p>
              <p>Advance Payment: {tenant.advancePayment}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TenantList;
