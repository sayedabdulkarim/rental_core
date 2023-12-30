import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../../components/home/Dashboard";
import { useGetAllRoomDetailsQuery } from "../../apiSlices/propertyApiSlice";
import { setPropertiesList } from "../../slices/propertySlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      {/* {userInfo?.data?.rooms?.length ? ( */}
      {getAllRoomDetails?.roomDetails?.length ? (
        <>
          <button>Add Tenant</button>
          <Dashboard />
        </>
      ) : (
        <>
          <button onClick={() => navigate(`/addroom`)}>Add Rooms</button>
        </>
      )}
    </div>
  );
};

export default Home;
