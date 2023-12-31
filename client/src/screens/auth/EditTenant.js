import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetTenantByIDQuery } from "../../apiSlices/tenantApiSlice";

const EditTenant = () => {
  const { tenantId } = useParams(); // This hook allows you to grab parameters from the URL
  const [tenantData, setTenantData] = useState(null);

  const { data: getTenantByID, isLoading: getTenantByIDLoading } =
    useGetTenantByIDQuery();

  useEffect(() => {
    // Fetch tenant data by ID
    const fetchTenantData = async () => {
      try {
        // Replace with your actual API call to fetch tenant data
        const response = await fetch(`/api/tenants/${tenantId}`);
        const data = await response.json();
        setTenantData(data);
      } catch (error) {
        console.error("Error fetching tenant data:", error);
      }
    };

    if (tenantId) {
      fetchTenantData();
    }
  }, [tenantId]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ tenantId });
    // Here you would handle the form submission
    // Make an API call to update the tenant data
  };

  // if (!tenantData) {
  //   return <div>Loading...</div>; // Or any other loading state representation
  // }

  return (
    <div className="edit_tenant_container">
      <h1>Edit Tenant</h1>
      <form onSubmit={handleSubmit}>
        {/* Create form fields and populate them with tenantData */}
        {/* Example: */}
        <label>
          Name:
          <input type="text" value={tenantData?.name} /* ... */ />
        </label>
        {/* Add other fields for editing tenant information */}
        <button type="submit">Update Tenant</button>
      </form>
    </div>
  );
};

export default EditTenant;
