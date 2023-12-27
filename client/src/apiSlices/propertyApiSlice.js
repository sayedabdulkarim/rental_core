import { apiSlice } from "./";

const USERS_URL = "api/users";

export const propertyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addRoomDetails: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/properties/addrooms`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddRoomDetailsMutation } = propertyApiSlice;
