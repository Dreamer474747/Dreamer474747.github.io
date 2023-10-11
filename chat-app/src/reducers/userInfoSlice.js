import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	userInfo: {}
};





export const userInfoSlice = createSlice({
	name: "userInfo",
	initialState,
	reducers: {
		userLogged: (state, action) => {
			state.userInfo = action.payload;
		},
		userInfoEmpty: state => {
			state.userInfo = {};
		}
	}
})



export const { userLogged, userInfoEmpty } = userInfoSlice.actions;


export const selectUserInfo = state => state.userInfo.userInfo;





export default userInfoSlice.reducer;
