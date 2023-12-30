import { apiSlice } from "./";

const USERS_URL = "api/users";

export const propertyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addRoomDetails: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/tenants/add`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddRoomDetailsMutation,
  useGetAllRoomDetailsQuery,
  useGetRoomDetailsQuery,
  useUpdateRoomDetailsMutation,
} = propertyApiSlice;
