import { useEffect, useRef } from "react";

import { Box, Typography } from "@mui/material";

import UserMessage from "./chatMessage/UserMessage";
import ChatPartnerMessage from "./chatMessage/ChatPartnerMessage";

import { useSelector, useDispatch } from "react-redux";

import { selectCollectedMessages } from "../../../../reducers/chatSlice";

import { selectUserInfo } from "../../../../reducers/userInfoSlice";








const ChatInterface = () => {
	
	let chatMessages = useSelector(selectCollectedMessages);
	
	const { id: userId } = useSelector(selectUserInfo);
	
	//Array.isArray(chatMessages) is to determine whether the chatMessages variable is populated with value or not.
	
	const chatContactRef = useRef(null);
	
	useEffect(() => {
		chatContactRef.current.scrollTop = chatContactRef.current.scrollHeight;
	}, [chatMessages])
	
	
	
	
	
	
	return (
			<Box
			sx={{
				flex: 1,
				display: "flex",
				flexDirection: "column",
				padding: "0 0.75rem",
				overflowY: "scroll",
			}}
			ref={chatContactRef}
			>
			
			{
				Array.isArray(chatMessages.messages)? chatMessages.messages.map((msg, index) => (
					msg.senderId === userId? (<UserMessage msgId={msg.id} time={msg.time} key={index}> {msg.text} </UserMessage>) :
					(<ChatPartnerMessage msgId={msg.id} time={msg.time} key={index}> {msg.text} </ChatPartnerMessage>)
				)) :
				(
					<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: 1
					}}
					>
						<Typography
						sx={{
							color: "#fff",
							fontSize: {xs: "10px", sm: "14px", smMd: "1rem", lg: "1.5rem"}
						}}
						>
							Choose a chat and start chatting!
						</Typography>
					</Box>
				)
			}
			
			</Box>
	
	)
}

export default ChatInterface;





