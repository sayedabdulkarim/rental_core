import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetRoomDetailsQuery,
  useUpdateRoomDetailsMutation,
} from "../../apiSlices/propertyApiSlice";

const RoomDetails = () => {
  const { roomType, roomId } = useParams();
  const [formData, setFormData] = useState({
    rent: "",
    description: "",
    equipmentdetails: "",
  });

  const {
    data: roomDetails,
    isLoading,
    isError,
    error,
  } = useGetRoomDetailsQuery({ roomType, roomId });
  const [updateRoomDetails, { isLoading: isUpdating, isSuccess }] =
    useUpdateRoomDetailsMutation();

  useEffect(() => {
    if (roomDetails) {
      setFormData({
        rent: roomDetails?.roomDetails?.details.rent,
        description: roomDetails?.roomDetails?.details.description,
        equipmentdetails: roomDetails?.roomDetails?.details.equipmentdetails,
      });
    }
  }, [roomDetails]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData, " formDataaa");
    updateRoomDetails({ roomType, roomId, data: formData });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div>Error: {error?.data?.message || "An error occurred"}</div>;

  return (
    <div className="room_details_container">
      <h1
        onClick={() =>
          console.log(
            {
              roomDetails,
              alloted: roomDetails?.roomDetails?.details?.isAllotted,
            },
            " ccccc"
          )
        }
      >
        Room Details : {roomDetails?.roomType}
      </h1>
      <h3>Room Name : {roomDetails?.roomDetails?.name}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rent:</label>
          <input
            type="number"
            name="rent"
            value={formData.rent}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Equipment Details:</label>
          <textarea
            name="equipmentdetails"
            value={formData.equipmentdetails}
            onChange={handleChange}
          />
        </div>
        {roomDetails?.roomDetails?.details?.isAllotted ? (
          <strong
            onClick={() =>
              console.log(roomDetails?.roomDetails?.details?.isAllotted, " ccc")
            }
          >
            This room is already alloted.Click to view the tenant.
          </strong>
        ) : (
          <button type="submit" disabled={isUpdating}>
            Update Room
          </button>
        )}
      </form>
      {isSuccess && <p>Room updated successfully!</p>}
    </div>
  );
};

export default RoomDetails;
