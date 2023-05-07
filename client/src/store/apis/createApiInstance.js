import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../utils/commonFunctions";

const API_BASE_QUERY = "http://localhost:4000/api";

const getBaseQuery = () => {
  return fetchBaseQuery({
    baseUrl: API_BASE_QUERY,
    prepareHeaders: (headers, { getState }) => {
      const token = getCookie("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
};

const createApiInstance = createApi({
  baseQuery: getBaseQuery(),
  endpoints: () => ({}), //inject endpoints separately
});

export default createApiInstance;
