import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import { useGetAllRoomDetailsQuery } from "../../apiSlices/propertyApiSlice";

const Home = () => {
  const { userInfo } = useSelector((state) => state.authReducer);

  // RTK Query hook
  const {
    data: getAllRoomDetails,
    refetch,
    isLoading: isLoadinGetAllRoomDetails,
  } = useGetAllRoomDetailsQuery();

  //async
  useEffect(() => {
    console.log(getAllRoomDetails, "getAllRoomDetails");
  }, [getAllRoomDetails]);

  return (
    <div>
      {userInfo?.data?.rooms?.length ? (
        <>
          <Dashboard />
        </>
      ) : (
        <>
          <button onClick={() => console.log(userInfo, " usss")}>
            Add Rooms
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
