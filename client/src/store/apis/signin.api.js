import createApiInstance from "./createApiInstance";

export const extendedApi = createApiInstance.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: ({ email, password }) => ({
        url: "/signin",
        method: "POST",
        body: { email, password },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSigninMutation } = extendedApi;
