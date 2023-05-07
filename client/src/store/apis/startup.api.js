import createApiInstance from "./createApiInstance";

export const extendedApi = createApiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createStartup: builder.mutation({
      query: (payload) => ({
        url: "/startup",
        method: "POST",
        body: payload,
      }),
    }),
    getAllStartups: builder.mutation({
      query: () => ({
        url: "/startups",
        method: "GET",
      }),
    }),
    getAllStartupsCreatedBy: builder.mutation({
      query: (userId) => ({
        url: "/startups/" + userId,
        method: "GET",
      }),
    }),
    deleteStartup: builder.mutation({
      query: (id) => ({
        url: "/startup/" + id,
        method: "DELETE",
      }),
    }),
    updateStartup: builder.mutation({
      query: ({ id, payload }) => ({
        url: "/startup/" + id,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateStartupMutation,
  useGetAllStartupsMutation,
  useGetAllStartupsCreatedByMutation,
  useDeleteStartupMutation,
  useUpdateStartupMutation,
} = extendedApi;
