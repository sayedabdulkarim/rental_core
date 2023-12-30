import { apiSlice } from "./";

const USERS_URL = "api/users";

export const tenantApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTenant: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/tenants/add`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddTenantMutation } = tenantApiSlice;
