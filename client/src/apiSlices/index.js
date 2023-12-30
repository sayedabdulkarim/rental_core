import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOutUser } from "../slices/authSlice";
const getJwtToken = () => {
  return localStorage.getItem("jwtToken");
};

const baseQueryWithReauth = async (args, api, extraOptions) => {
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

  let result = await baseQuery(args, api, extraOptions);

  // Check for 401 Unauthorized response
  if (result.error && result.error.status === 401) {
    // Perform logout operations
    api.dispatch(logOutUser());
    localStorage.clear();
    window.location.href = "/auth";
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
