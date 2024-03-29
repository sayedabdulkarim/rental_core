import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Row, Col, Divider } from "antd";

const Dashboard = () => {
  //misc
  const navigate = useNavigate();
  const roomDetails = useSelector(
    (state) => state.propertyReducer.propertiesList?.roomDetails || []
  );

  return (
    <div className="dashboard-container" style={{ padding: "20px" }}>
      {roomDetails.map((property) => (
        <div key={property._id}>
          {Object.entries(property.roomTypesContainer.roomTypes).map(
            ([roomType, { rooms }], index, array) => (
              <div key={roomType}>
                <Divider
                  orientation="left"
                  style={{ fontSize: "24px", fontWeight: "bold" }}
                >
                  {roomType.toUpperCase()} Rooms
                </Divider>
                <Row gutter={[16, 16]}>
                  {" "}
                  {/* x and y space between cards */}
                  {rooms.map((room) => (
                    <Col
                      key={room._id}
                      xs={24}
                      sm={12}
                      md={8}
                      lg={6}
                      style={{
                        border: room?.details?.isAllotted
                          ? "5px solid green"
                          : "",
                      }}
                    >
                      <Card
                        title={room.name}
                        bordered={true}
                        style={{ cursor: "pointer" }} // Add cursor pointer style here
                        onClick={() => {
                          navigate(`/roomdetails/${roomType}/${room._id}`);
                          // console.log("Card clicked!", { room, roomType });
                        }}
                      >
                        <p>Rent: {room.details.rent}</p>
                        <p>Description: {room.details.description}</p>
                        {/* Add other room details here */}
                      </Card>
                    </Col>
                  ))}
                </Row>
                {/* Only add the bottom divider if it's not the last item */}
                {index < array.length - 1 && <Divider />}
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
