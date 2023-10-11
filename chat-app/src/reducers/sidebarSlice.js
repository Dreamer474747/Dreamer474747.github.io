import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	navbarFlag: false,
	contactsFlag: false
}


export const sidebarSlice = createSlice({
	name: "sidebars",
	initialState,
	reducers: {
		changeNavbarFlag: state => {
			if (state.navbarFlag) {
				state.navbarFlag = false;
			} else {
				state.navbarFlag = true;
			}
		},
		makeNavbarFlagFalse: state => {
			state.navbarFlag = false;
		},
		changeContactsFlag: state => {
			if (state.contactsFlag) {
				state.contactsFlag = false;
			} else {
				state.contactsFlag = true;
			}
		},
		makeContactsFlagFalse: state => {
			state.contactsFlag = false;
		}
	}
})




export const {
changeNavbarFlag,
makeNavbarFlagFalse,
changeContactsFlag,
makeContactsFlagFalse
} = sidebarSlice.actions;

export const selectNavbarFlag = state => state.sidebars.navbarFlag;
export const selectContactsFlag = state => state.sidebars.contactsFlag;




export default sidebarSlice.reducer;