import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./Dashboard";

const Home = () => {
  const { userInfo } = useSelector((state) => state.authReducer);
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
