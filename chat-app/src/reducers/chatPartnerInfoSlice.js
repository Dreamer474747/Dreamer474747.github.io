import { createSlice } from "@reduxjs/toolkit";



const chatPartnerInfoSlice = createSlice({
	name: "chatPartnerInfo",
	initialState: {
		chatPartnerInfo: {}
	},
	reducers: {
		setChatPartnerInfo: (state, action) => {
			state.chatPartnerInfo = action.payload;
		},
		setChatPartnerInfoEmpty: (state, action) => {
			state.chatPartnerInfo = {}
		}
	}
})



export const { setChatPartnerInfo, setChatPartnerInfoEmpty } = chatPartnerInfoSlice.actions;

export const selectChatPartnerInfo = state => state.chatPartnerInfo.chatPartnerInfo;


export default chatPartnerInfoSlice.reducer;







