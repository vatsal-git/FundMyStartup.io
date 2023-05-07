import createApiInstance from "./createApiInstance";

export const extendedApi = createApiInstance.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.mutation({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
    getUserById: builder.mutation({
      query: (id) => ({
        url: "/user/" + id,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserMutation, useGetUserByIdMutation } = extendedApi;
