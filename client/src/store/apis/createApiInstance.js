import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../utils/commonFunctions";

const API_BASE_QUERY = "http://localhost:4000/api";

const baseQuery = () => {
  const token = getCookie("token");

  return fetchBaseQuery({
    baseUrl: API_BASE_QUERY,
    prepareHeaders: (headers, { getState }) => {
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
};

const createApiInstance = createApi({
  baseQuery: baseQuery(),
  endpoints: () => ({}), //inject endpoints separately
});

export default createApiInstance;
