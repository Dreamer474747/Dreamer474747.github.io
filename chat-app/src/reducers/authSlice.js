import { apiSlice } from "../api/apiSlice";




export const authExtendedApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		createNewUser: builder.mutation({
			query: (initialUser) => ({
				url: "/users",
				method: "POST",
				body: initialUser
			}),
			invalidatesTags: ["USER"]
		}),
		getUser: builder.query({
			query: (initialUserId) => `/users/${initialUserId}`,
			providesTags: (result, error, arg) => [{type: "USER", id: arg}]
		})
	})
})





export const { useCreateNewUserMutation, useGetUserQuery, useLazyGetUserQuery } = authExtendedApiSlice;




