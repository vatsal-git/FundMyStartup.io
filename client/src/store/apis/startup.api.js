import createApiInstance from "./createApiInstance";

export const extendedApi = createApiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createStartup: builder.mutation({
      query: () => ({
        url: "/startup",
        method: "POST",
      }),
    }),
    getAllStartups: builder.query({
      query: () => ({
        url: "/startups",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateStartupMutation, useGetAllStartupsQuery } = extendedApi;
