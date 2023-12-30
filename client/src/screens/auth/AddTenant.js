import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, InputNumber, Button, Select } from "antd";
import { useGetAllRoomDetailsQuery } from "../../apiSlices/propertyApiSlice";
import { setPropertiesList } from "../../slices/propertySlice";

const AddTenant = () => {
  //misc
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.authReducer);
  //state
  const [form] = Form.useForm();
  const [roomData, setRoomData] = useState({}); // State to store room data
  const [availableRooms, setAvailableRooms] = useState([]); // State for available rooms based on type

  // RTK Query hook
  const {
    data: getAllRoomDetails,
    refetch,
    isLoading: isLoadinGetAllRoomDetails,
  } = useGetAllRoomDetailsQuery();

  //func
  const handleRoomTypeChange = (value) => {
    // Filter rooms based on selected room type and their allotment status
    const filteredRooms =
      roomData[value]?.rooms.filter((room) => !room.details.isAllotted) || [];
    setAvailableRooms(filteredRooms);
    form.setFieldsValue({ roomId: undefined }); // Reset the roomId field in form
  };

  const onFinish = (values) => {
    console.log("Received values from form: ", values);
    // Submit these values to your backend here
  };

  useEffect(() => {
    if (getAllRoomDetails) {
      console.log(getAllRoomDetails, " ggg");
      dispatch(setPropertiesList(getAllRoomDetails));
      setRoomData(
        getAllRoomDetails?.roomDetails?.[0]?.roomTypesContainer?.roomTypes || []
      );
    }
  }, [getAllRoomDetails, dispatch]);

  return (
    <div className="tenant_container">
      <h1 onClick={() => console.log(roomData, " roomData")}>Add Tenant</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* Room details */}

        {/* Room Type Dropdown */}
        <Form.Item
          name="roomType"
          label="Room Type"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select room type"
            onChange={handleRoomTypeChange}
          >
            {Object.keys(roomData).map((roomType) => (
              <Select.Option key={roomType} value={roomType}>
                {roomType.toUpperCase()}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Available Rooms Dropdown */}
        <Form.Item
          name="roomId"
          label="Select Room"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select a room">
            {availableRooms.map((room) => (
              <Select.Option key={room._id} value={room._id}>
                {room.name}
              </Select.Option>
            ))}
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
