import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllTenantsQuery } from "../../apiSlices/tenantApiSlice";

const TenantList = () => {
  const dispatch = useDispatch();
  // RTK Query hook
  const {
    data: getAllTenants,
    refetch,
    isLoading: getAllTenantsLoading,
  } = useGetAllTenantsQuery();

  //async
  useEffect(() => {
    if (getAllTenants) {
      console.log({
        getAllTenants,
      });
      //   dispatch(setPropertiesList(getAllTenants));
    }
  }, [getAllTenants, dispatch]);

  return (
    <div>
      <h1>TenantList</h1>
      <h1>TenantList</h1>
      <h1>TenantList</h1>
      <h1>TenantList</h1>
      <h1>TenantList</h1>
      <h1>TenantList</h1>
      <h1>TenantList</h1>
      <h1>TenantList</h1>
      <h1>TenantList</h1>
      <h1>TenantList</h1>
      <h1>TenantList</h1>
      <h1>TenantList</h1>
    </div>
  );
};

export default TenantList;
