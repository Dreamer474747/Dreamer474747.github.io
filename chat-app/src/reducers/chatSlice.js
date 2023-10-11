import { createSlice } from "@reduxjs/toolkit";

import { apiSlice } from "../api/apiSlice";




export const chatExtendedApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getChatPartnerPair: builder.query({
			query: (initialChatPartnerPairId) => `/chatPartnerPairs/${initialChatPartnerPairId}`,
			providesTags: (result, error, arg) => [{type: "CHAT", id: arg}]
		}),
		editChatPartnerPair: builder.mutation({
			query: (initialChatPartnerPair) => ({
				url: `/chatPartnerPairs/${initialChatPartnerPair.id}`,
				method: "PUT",
				body: initialChatPartnerPair
			}),
			invalidatesTags: (result, error, arg) => [{type: "CHAT", id: arg.id}]
		}),
		getChatMessages: builder.query({
			query: (initialChatPlaceId) => `/chatPlaces/${initialChatPlaceId}`,
			providesTags: (result, error, arg) => [{type: "CHAT", id: arg}]
		}),
		addNewMessage: builder.mutation({
			query: (initialNewMessages) => ({
				url: `/chatPlaces/${initialNewMessages.id}`,
				method: "PUT",
				body: initialNewMessages
			}),
			invalidatesTags: (result, error, arg) => [{type: "CHAT", id: arg.id}]
		})
	})
})





export const chatSlice = createSlice({
	name: "chat",
	initialState: {
		messages: {},
		lastMessages: {}
	},
	reducers: {
		Messagescollected: (state, action) => {
			state.messages = action.payload;
		},
		deleteCollectedMessages: state => {
			state.messages = {};
		},
		lastMessagesCollected: (state, action) => {
			state.lastMessages = action.payload;
		}
	}
})





export const {
Messagescollected,
deleteCollectedMessages,
lastMessagesCollected
} = chatSlice.actions;



export const selectCollectedMessages = state => state.chat.messages;
export const selectLastMessages = state => state.chat.lastMessages;

export default chatSlice.reducer;


export const {
useLazyGetChatPartnerPairQuery,
useLazyGetChatMessagesQuery,
useAddNewMessageMutation,
useEditChatPartnerPairMutation
} = chatExtendedApiSlice;
