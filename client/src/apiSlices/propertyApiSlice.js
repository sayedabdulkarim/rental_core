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
    getAllRoomDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/properties/allroomdetails`,
      }),
    }),
    getRoomDetails: builder.query({
      query: ({ roomType, roomId }) => ({
        url: `${USERS_URL}/properties/roomdetails/${roomType}/${roomId}`,
      }),
    }),
    updateRoomDetails: builder.query({
      query: ({ roomType, roomId, data }) => ({
        url: `${USERS_URL}/properties/roomdetails/${roomType}/${roomId}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddRoomDetailsMutation,
  useGetAllRoomDetailsQuery,
  useGetRoomDetailsQuery,
  useUpdateRoomDetailsQuery,
} = propertyApiSlice;
