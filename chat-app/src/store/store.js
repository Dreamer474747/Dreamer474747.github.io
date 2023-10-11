import { configureStore } from "@reduxjs/toolkit";

import sidebarSlice from "../reducers/sidebarSlice";

import userInfoSlice from "../reducers/userInfoSlice";

import chatSlice from "../reducers/chatSlice";

import chatPartnerInfoSlice from "../reducers/chatPartnerInfoSlice";

import { createNewContactExtendedApiSlice } from "../reducers/createNewContactSlice";

import { apiSlice } from "../api/apiSlice";






export const store = configureStore({
	reducer: {
		sidebars: sidebarSlice,
		userInfo: userInfoSlice,
		chat: chatSlice,
		chatPartnerInfo: chatPartnerInfoSlice,
		[apiSlice.reducerPath]: apiSlice.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})



store.dispatch(createNewContactExtendedApiSlice.endpoints.getAllUsers.initiate())
