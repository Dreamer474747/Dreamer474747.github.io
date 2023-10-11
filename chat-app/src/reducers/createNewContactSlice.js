import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../api/apiSlice";




export const createNewContactExtendedApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getAllUsers: builder.query({
			query: () => "/users",
			providesTags: (result = [], error, arg) => [
				"USER",
				...result.map(({ id }) => ({ type: "USER", id }))
			]
		}),
		editUser: builder.mutation({
			query: (initialUser) => ({
				url: `/users/${initialUser.id}`,
				method: "PUT",
				body: initialUser
			}),
			invalidatesTags: (result, error, arg) => [{type: "USER", id: arg.id}]
		}),
		createNewChatPartnerPair: builder.mutation({
			query: (initialNewChatPartnerPair) => ({
				url: "/chatPartnerPairs",
				method: "POST",
				body: initialNewChatPartnerPair
			}),
			invalidatesTags: ["CHAT"]
		}),
		createNewChatPlace: builder.mutation({
			query: (initialNewChatPlace) => ({
				url: "/chatPlaces",
				method: "POST",
				body: initialNewChatPlace
			}),
			invalidatesTags: ["CHAT"]
		})
	})
})



const selectGetAllUsersResult = createNewContactExtendedApiSlice.endpoints.getAllUsers.select();


export const selectUsersDataFromCatch = createSelector(
	selectGetAllUsersResult,
	(users) => users.data
)


export const {
useEditUserMutation,
useCreateNewChatPartnerPairMutation,
useCreateNewChatPlaceMutation
} = createNewContactExtendedApiSlice;


