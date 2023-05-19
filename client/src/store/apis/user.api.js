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
    updateUser: builder.mutation({
      query: (payload) => ({
        url: "/user",
        method: "PUT",
        body: payload,
      }),
    }),
    deleteUser: builder.mutation({
      query: (payload) => ({
        url: "/user",
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserMutation,
  useGetUserByIdMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = extendedApi;
