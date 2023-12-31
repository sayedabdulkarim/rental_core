import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetTenantByIDQuery } from "../../apiSlices/tenantApiSlice";

const EditTenant = () => {
  const { tenantId } = useParams();

  const {
    data: tenantData,
    isLoading,
    isError,
    error,
  } = useGetTenantByIDQuery(tenantId);

  useEffect(() => {
    // You can perform additional logic here if needed, based on tenantData
  }, [tenantData]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ tenantId });
    // Here you would handle the form submission
    // Make an API call to update the tenant data
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div>Error: {error?.data?.message || "An error occurred"}</div>;

  return (
    <div className="edit_tenant_container">
      <h1>Edit Tenant</h1>
      <form onSubmit={handleSubmit}>
        {/* Create form fields and populate them with tenantData */}
        {/* Example: */}
        <label>
          Name:
          <input
            type="text"
            value={tenantData?.personalDetails?.name} /* ... */
          />
        </label>
        {/* Add other fields for editing tenant information */}
        <button type="submit">Update Tenant</button>
      </form>
    </div>
  );
};

export default EditTenant;
