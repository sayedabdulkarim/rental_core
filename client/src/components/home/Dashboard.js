import React from "react";
import { useSelector } from "react-redux";
import { Card, Row, Col } from "antd";

const Dashboard = () => {
  const roomDetails = useSelector(
    (state) => state.propertyReducer.propertiesList?.roomDetails || []
  );

  return (
    <div className="dahboard_container">
      {roomDetails.map((property) => (
        <div key={property._id}>
          {Object.entries(property.roomTypesContainer.roomTypes).map(
            ([roomType, { rooms }]) => (
              <div key={roomType}>
                <h2>{roomType.toUpperCase()} Rooms</h2>
                <Row gutter={16}>
                  {rooms.map((room) => (
                    <Col key={room._id} span={8}>
                      <Card title={room.name} bordered={false}>
                        <p>Rent: {room.details.rent}</p>
                        <p>Description: {room.details.description}</p>
                        {/* Add other room details here */}
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
