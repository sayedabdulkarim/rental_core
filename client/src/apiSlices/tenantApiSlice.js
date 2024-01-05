import { apiSlice } from "./";

const USERS_URL = "api/users";

export const tenantApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTenants: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/tenants/list`,
      }),
    }),
    getTenantByID: builder.query({
      query: (tenantId) => ({
        url: `${USERS_URL}/tenants/getTenantById/${tenantId}`,
      }),
    }),
    addTenant: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/tenants/add`,
        method: "POST",
        body: data,
      }),
    }),
    editTenant: builder.mutation({
      query: ({ data, tenantId }) => ({
        url: `${USERS_URL}/tenants/edit/${tenantId}`,
        method: "PATCH",
        body: data,
      }),
    }),
    removeTenant: builder.mutation({
      query: ({ data, tenantId }) => ({
        url: `${USERS_URL}/tenants/remove/${tenantId}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddTenantMutation,
  useGetAllTenantsQuery,
  useGetTenantByIDQuery,
  useEditTenantMutation,
  useRemoveTenantMutation,
} = tenantApiSlice;
