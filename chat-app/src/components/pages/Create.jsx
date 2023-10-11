import { useState, useEffect } from "react";
import _ from "lodash";

import { TextField, Box, Typography } from "@mui/material";

import { selectUsersDataFromCatch } from "../../reducers/createNewContactSlice";
import { selectUserInfo } from "../../reducers/userInfoSlice";

import {
useEditUserMutation,
useCreateNewChatPartnerPairMutation,
useCreateNewChatPlaceMutation
} from "../../reducers/createNewContactSlice";

import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import toast from 'react-hot-toast';

import { userLogged as userInfoChanged } from "../../reducers/userInfoSlice";










const Create = () => {
	
	const dispatch = useDispatch();
	
	const [editUser] = useEditUserMutation();
	const [createNewChatPlace] = useCreateNewChatPlaceMutation();
	const [createNewChatPartnerPair] = useCreateNewChatPartnerPairMutation();
	
	const userInfo = useSelector(selectUserInfo);
	//userInfo = the current user that is using the app
	const allUsers = useSelector(selectUsersDataFromCatch);
	//all users and this var includes the current user that is using the app
	
	const allOtherUsers = allUsers?.filter(user => user.id !== userInfo.id)
	//this var does not include the current user that is using the app
	
	let existingContacts = new Set();
	const [allOtherNotConnectedUsers, setAllOtherNotConnectedUsers] = useState([]);
	
	useEffect(() => {
		
		for(let i = 0; i < allOtherUsers.length; i++) {
			
			for (let j = 0; j < userInfo.chatKey.length; j++) {
				
				const isChatKeyExist = allOtherUsers[i].chatKey.some(otherUserChatKey => otherUserChatKey === userInfo.chatKey[j])
				
				if (isChatKeyExist) {
					existingContacts.add(allOtherUsers[i]);
				}
			}
		}
		
		const resultArray = allOtherUsers.filter(item => !existingContacts.has(item));
		
		setAllOtherNotConnectedUsers(resultArray)
	}, [])
	
	
	
	
	const [allResultUsers, setAllResultUsers] = useState([]);
	
	const searchFunction = _.debounce((e) => {
		const currentInputValue = e.target.value;
		
		if (currentInputValue === "") {
			setAllResultUsers([]);
		} else {
			const allMatchedContacts = allOtherNotConnectedUsers?.map(user => {
				if (user.id.includes(currentInputValue)) {
					return user;
				} else {
					return;
				}
			}).filter(user => user !== undefined).slice(0, 3)
			
			setAllResultUsers(allMatchedContacts)
		}
	}, 750);
	
	
	const addNewContact = async user => {
		
		const newChatKey = nanoid();
		const time = new Date().toISOString();
		
		const otherUserNewData = {
			...user,
			chatKey: [...user.chatKey, newChatKey]
		}
		const newUserInfo = {
			...userInfo,
			chatKey: [...userInfo.chatKey, newChatKey]
		}
		
		
		const newChatPlace = {
			id: newChatKey,
			messages: [
				{
					id: 1,
					senderId: userInfo.id,
					senderUsername: userInfo.username,
					isSeen: true,
					text: "hello",
					time
				}
			]
		}
		
		
		const newChatPartnerPairs = {
			id: newChatKey,
			chatPartnersIds: [
				userInfo.id,
				user.id
			],
			lastText: {
				id: 1,
				senderId: userInfo.id,
				senderUsername: userInfo.username,
				isSeen: true,
				text: "hello",
				time
			}
		}
		
		
		const notConnectedUsersUpdated = allOtherNotConnectedUsers.filter((item) => item.id !== user.id);
		
		try {
			await editUser(newUserInfo).unwrap();
			await editUser(otherUserNewData).unwrap();
			
			await createNewChatPlace(newChatPlace).unwrap();
			
			await createNewChatPartnerPair(newChatPartnerPairs).unwrap();
			
			toast.success("new contact was successfully created", {style: {fontFamily: "PoppinsMedium"}})
			
			setAllOtherNotConnectedUsers(notConnectedUsersUpdated);
			
			dispatch(userInfoChanged(newUserInfo))
		} catch(err) {
			console.log(err)
		}
		
		
	}
	
	
	return (
		<Box
		sx={{
			width: {xs: "90%", lg: "70%"},
			margin: {xs: "3rem auto 0", md: "3rem 5rem 0"},
		}}
		>
			<TextField
			sx={{ width: 1 }}
			aria-label="Enter the id to find a new Contact"
			label="Search for a new contact"
			variant="standard"
			onChange={searchFunction}
			/>
			
			<ul
			style={{
				padding: "1rem 0",
				listStyleType: "none",
				borderRadius: "8px",
				margin: 0
			}}
			>
			{
				allResultUsers?.map((user, index) => (
				
					<Typography
					key={index}
					onClick={() => addNewContact(user)}
					component="li"
					sx={{
						color: "#fff",
						fontFamily: "poppinsMedium",
						fontSize: {xs: "12px", sm: "1rem"},
						border: "1px solid #fff",
						borderRadius: "10px",
						padding: "0.5rem",
						marginBottom: "0.75rem",
						textAlign: "center",
						cursor: "pointer"
					}}
					>
						sey "hello" to {user.id}
					</Typography>
				
				))
			}
			
				
			</ul>
			
		</Box>
	)
}

export default Create;




//<Typography
//component="li"
//sx={{
//	color: "#fff",
//	fontFamily: "poppinsMedium",
//	fontSize: {xs: "12px", sm: "1rem"},
//	border: "1px solid #fff",
//	borderRadius: "10px",
//	padding: "0.5rem",
//	marginBottom: "0.75rem",
//	textAlign: "center"
//}}
//>
//	say "hello" to dreamer3
//</Typography>
//				
//				
//				
//				
//