import React from "react";
import { Form, Input, InputNumber, Button, Row, Col, Divider } from "antd";

const AddRooms = () => {
  const [form] = Form.useForm();

  const transformFormValuesToPayload = (formValues) => {
    const payload = {
      roomTypes: {},
    };

    Object.entries(formValues).forEach(([key, value]) => {
      // Adjusted regex to account for room type patterns like "1rk", "1bhk"
      const match = key.match(
        /^(\d+[a-z]+)(Count|Rent|Description|EquipmentDetails)$/i
      );
      if (match) {
        const [, roomType, field] = match;
        // Initialize the room type object if it doesn't already exist
        payload.roomTypes[roomType] = payload.roomTypes[roomType] || {
          count: 0,
          details: {},
        };

        if (field === "Count") {
          payload.roomTypes[roomType].count = value;
        } else if (field === "Rent") {
          payload.roomTypes[roomType].details[field.toLowerCase()] = value;
        } else {
          // Assuming all other fields belong to 'details'
          payload.roomTypes[roomType].details[field.toLowerCase()] = value;
        }
      }
    });

    return payload;
  };

  const onFinish = (values) => {
    const payload = transformFormValuesToPayload(values);
    console.log("Transformed payload:", payload);
  };

  const roomTypes = ["1rk", "1bhk"];

  return (
    <div className="add_rooms_container">
      <Form
        form={form}
        layout="vertical"
        name="addRoomsForm"
        onFinish={onFinish}
      >
        {roomTypes.map((roomType, index) => (
          <React.Fragment key={roomType}>
            <h3>{roomType.toUpperCase()} Section</h3>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={8}>
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
                  <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item
                  name={`${roomType}Rent`}
                  label="Rent"
                  rules={[
                    { required: true, message: "Please input the rent!" },
                  ]}
                >
                  <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24}>
                <Form.Item name={`${roomType}Description`} label="Description">
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24}>
                <Form.Item
                  name={`${roomType}EquipmentDetails`}
                  label="Equipment Details"
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
            {index < roomTypes.length - 1 && <Divider />}
          </React.Fragment>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddRooms;
