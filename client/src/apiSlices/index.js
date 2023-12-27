import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getJwtToken = () => {
  return localStorage.getItem("jwtToken");
};
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/",
  credentials: "include", // Necessary for cookies to be included
  prepareHeaders: (headers) => {
    const token = getJwtToken();
    if (token) {
      // Set the Authorization header with the JWT
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
