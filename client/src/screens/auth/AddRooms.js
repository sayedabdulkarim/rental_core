import React from "react";
import { Form, Input, InputNumber, Button, Row, Col } from "antd";

const AddRooms = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <div className="add_rooms_container">
      <Form
        form={form}
        layout="vertical"
        name="addRoomsForm"
        onFinish={onFinish}
      >
        {["1rk", "1bhk", "2bhk"].map((roomType) => (
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
                  <Input />
                </Form.Item>
              </Col>
            </Row>
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
