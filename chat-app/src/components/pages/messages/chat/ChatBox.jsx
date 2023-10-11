import { useState, useEffect } from "react";

import { Box, Divider } from "@mui/material";

import { SendOutlined } from '@ant-design/icons';

import { useSelector, useDispatch } from "react-redux";

import { selectChatPartnerInfo } from "../../../../reducers/chatPartnerInfoSlice";
import { selectUserInfo } from "../../../../reducers/userInfoSlice";

import {
selectCollectedMessages,
useAddNewMessageMutation,
useEditChatPartnerPairMutation,
Messagescollected,
lastMessagesCollected,
selectLastMessages
} from "../../../../reducers/chatSlice";

import toast from 'react-hot-toast';







const ChatBox = () => {
	
	const dispatch = useDispatch();
	const [addNewMessage] = useAddNewMessageMutation();
	const [editChatPartnerPair] = useEditChatPartnerPairMutation();
	
	const allLastMessages = useSelector(selectLastMessages);
	const allMessagesAndTheChatId = useSelector(selectCollectedMessages);
	
	
	const { chatKey, chatPartnerName, chatPartnerId } = useSelector(selectChatPartnerInfo);
	const { id: userId, username } = useSelector(selectUserInfo);
	
	
	
	
	useEffect(() => {
		setInputValue("");
	}, [chatKey])
	
	
	
	const [inputValue, setInputValue] = useState("");
	
	
	const onInputValueChange = (e) => {
		setInputValue(e.target.value);
	}
	
	
	const sendMessage = () => {
		if (!chatKey) {
			toast.error("you have to choose a chat first", {style: {fontFamily: "PoppinsMedium"}})
		}
		else if (inputValue.trim()) {
			const newMessage = {
				id: allMessagesAndTheChatId.messages.length + 1,
				senderId: userId,
				senderUsername: username,
				isSeen: true,
				text: inputValue.trim(),
				time: new Date().toISOString(),
			}
			
			const newMessagesToBeSent = {
				...allMessagesAndTheChatId,
				messages: [ ...allMessagesAndTheChatId.messages, newMessage ]
			}
			
			addNewMessage(newMessagesToBeSent);
			dispatch(Messagescollected(newMessagesToBeSent));
			setInputValue("");
			
			const newChatPair = {
				id: chatKey,
				chatPartnersIds: [userId, chatPartnerId],
				lastText: {...newMessage}
			}
			
			editChatPartnerPair(newChatPair);
			
			
			
			const updatedLastMessages = allLastMessages.map(lastM => {
				if (lastM.id === chatKey) {
					return newChatPair;
				} else {
					return lastM;
				}
			})
			
			
			
			dispatch(lastMessagesCollected(updatedLastMessages));
			
			
		} else {
			toast.error("Chat input is empty", {style: {fontFamily: "PoppinsMedium"}})
		}
	}
	
	
	
	
	
	
	
	return (
		<>
			<Divider sx={{ marginBottom: {xs: "0.5rem", sm: "2rem"}, borderColor: "rgba(255, 255, 255, 0.25)" }} /> 
			<Box
			sx={{
				display: "flex",
				justifyContent: "space-between",
				height: "45px",
			}}
			>
	
				<input
					placeholder={Boolean(chatPartnerName)? "Write here..." : "Choose a chat"}
					className="chat-box-input"
					disabled={!Boolean(chatPartnerName)}
					value={inputValue}
					onChange={onInputValueChange}
					style={{
						flex: 1,
						height: "45px",
						outline: "none",
						border: "none",
						backgroundColor: "#212121",
						color: "white",
						borderRadius: "10px",
						padding: "0 0.8rem",
						fontSize: "18px",
					}}
				/>
	
				<SendOutlined
				className= "chat-box-btn"
				onClick={sendMessage}
				style={{
					color: "#fff",
					width: "45px",
					height: "45px",
					backgroundColor: "#1A66FF",
					borderRadius: "10px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					fontSize: "1.5rem",
					cursor: Boolean(chatPartnerName)? "pointer" : "default",
					marginLeft: "1.5rem"
				}}
				/>
	
			</Box>
	
	
		</>
	)
}

export default ChatBox;
