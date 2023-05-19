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
      query: (searchTerm) => ({
        url: "/startups",
        method: "GET",
        params: {
          searchTerm: searchTerm,
        },
      }),
    }),
    getAllStartupsCreatedBy: builder.mutation({
      query: ({ userId, searchTerm }) => ({
        url: `/startups/${userId}`,
        method: "GET",
        params: {
          searchTerm: searchTerm,
        },
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
