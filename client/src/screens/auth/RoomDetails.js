import React from "react";
import { useParams } from "react-router-dom";

const RoomDetails = () => {
  const { roomType, roomId } = useParams();

  return (
    <div>
      <h1>RoomDetails</h1>
      <h1
        onClick={() =>
          console.log({
            roomType,
            roomId,
          })
        }
      >
        RoomDetails
      </h1>
      <h1>RoomDetails</h1>
      <h1>RoomDetails</h1>
      <h1>RoomDetails</h1>
      <h1>RoomDetails</h1>
      <h1>RoomDetails</h1>
      <h1>RoomDetails</h1>
      <h1>RoomDetails</h1>
      <h1>RoomDetails</h1>
      <h1>RoomDetails</h1>
      <h1>RoomDetails</h1>
      <h1>RoomDetails</h1>
      <h1>RoomDetails</h1>
    </div>
  );
};

export default RoomDetails;
