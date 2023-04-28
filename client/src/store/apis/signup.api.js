import createApiInstance from "./createApiInstance";

export const extendedApi = createApiInstance.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({ url: "/signup", method: "POST", body: userData }),
    }),
  }),
  overrideExisting: false,
});

export const { useSignupMutation } = extendedApi;
