import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const roomDetails = useSelector(
    (state) => state.propertyReducer.propertiesList?.roomDetails || []
  );

  return (
    <div>
      <h1 onClick={() => console.log(roomDetails, "propertiesList")}>
        Dashboard
      </h1>
      {/* ... other content ... */}
    </div>
  );
};

export default Dashboard;
