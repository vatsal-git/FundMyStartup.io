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
  }),
  overrideExisting: false,
});

export const { useCreateStartupMutation, useGetAllStartupsMutation } =
  extendedApi;
