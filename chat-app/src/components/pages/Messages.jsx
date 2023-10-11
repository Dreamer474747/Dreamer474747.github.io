import { useEffect } from "react";

import Contacts from "./messages/contacts/Contacts";
import ChatPartnerInfo from "./messages/chat/ChatPartnerInfo";
import ChatBox from "./messages/chat/ChatBox";

import { Box, useTheme, useMediaQuery } from "@mui/material";

import ChatInterface from "./messages/chat/ChatInterface";

import { ContactsActionButton, ContactsDrawer } from "../drawer";

import { deleteCollectedMessages } from "../../reducers/chatSlice";

import { setChatPartnerInfoEmpty } from "../../reducers/chatPartnerInfoSlice";

import { useDispatch } from "react-redux";






const Messages = () => {
	
	const dispatch = useDispatch();
	
	
	
	
	
	useEffect(() => {
		
		return () => {
			dispatch(deleteCollectedMessages());
			dispatch(setChatPartnerInfoEmpty())
		}
	}, [])
	
	
	
	
	
	return (
		<>
			<Contacts />
			
			<ContactsActionButton />
			
			<ContactsDrawer />
			
			<Box
				sx={{
					backgroundColor: "secondary.main",
					width: {
						xs: "100%",
						sm: "100%",
						smMd: "66.22%"
					},
					height: "90vh",
					borderRadius: "20px",
					border: "1px solid rgba(255, 255, 255, 0.2)",
					padding: {xs: "1rem 1.5rem", sm: "1.5rem 2rem"},
					display: "flex",
					flexDirection: "column"
				}}
			>
				<ChatPartnerInfo />

				<ChatInterface />
        
				<ChatBox /> 

			</Box>
		</>
	)
}



export default Messages;
