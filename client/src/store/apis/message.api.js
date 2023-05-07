import createApiInstance from "./createApiInstance";

export const extendedApi = createApiInstance.injectEndpoints({
  endpoints: (builder) => ({
    getUserMessages: builder.mutation({
      query: () => ({
        url: "/messages",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserMessagesMutation } = extendedApi;
