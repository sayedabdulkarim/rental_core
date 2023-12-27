import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../../components/home/Dashboard";
import { useGetAllRoomDetailsQuery } from "../../apiSlices/propertyApiSlice";
import { setPropertiesList } from "../../slices/propertySlice";

const Home = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authReducer);

  // RTK Query hook
  const {
    data: getAllRoomDetails,
    refetch,
    isLoading: isLoadinGetAllRoomDetails,
  } = useGetAllRoomDetailsQuery();

  //async
  useEffect(() => {
    if (getAllRoomDetails) {
      dispatch(setPropertiesList(getAllRoomDetails));
    }
  }, [getAllRoomDetails, dispatch]);

  return (
    <div className="home_container">
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
