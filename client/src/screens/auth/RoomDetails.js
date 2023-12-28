import React from "react";
import { useParams } from "react-router-dom";
import { useGetRoomDetailsQuery } from "../../apiSlices/propertyApiSlice";

const RoomDetails = () => {
  const { roomType, roomId } = useParams();

  // Use the query hook provided by RTK Query with the parameters
  const {
    data: roomDetails,
    isLoading,
    isError,
    error,
  } = useGetRoomDetailsQuery({ roomType, roomId });

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div>Error: {error?.data?.message || "An error occurred"}</div>;

  return (
    <div>
      <h1>Room Details</h1>
      {roomDetails && (
        <>
          <h2>{roomDetails?.roomDetails?.name}</h2>
          <p>Rent: {roomDetails?.roomDetails?.details.rent}</p>
          <p>Description: {roomDetails?.roomDetails?.details.description}</p>
          {/* Display more details here */}
        </>
      )}
    </div>
  );
};

export default RoomDetails;
