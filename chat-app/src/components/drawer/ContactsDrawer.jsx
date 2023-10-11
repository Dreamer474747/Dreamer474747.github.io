import { useState, useEffect } from "react";

import { Drawer, Box, Typography } from "@mui/material/";

import Contact from "../pages/messages/contacts/Contact";

import { useSelector, useDispatch } from "react-redux";

import { selectContactsFlag, changeContactsFlag } from "../../reducers/sidebarSlice";

import { selectUserInfo } from "../../reducers/userInfoSlice";
import { useLazyGetChatPartnerPairQuery } from "../../reducers/chatSlice";







const ContactsDrawer = () => {
	
	const contactsFlag = useSelector(selectContactsFlag);
	
	const dispatch = useDispatch();
	
	
	
	const { chatKey, id: userId } = useSelector(selectUserInfo);
	
	const [getChatPartnerPair] = useLazyGetChatPartnerPairQuery()
	
	const [allchatPartnerPairs, setAllchatPartnerPairs] = useState([]);
	
	const helperSet = new Set();
	
	useEffect(() => {
		const chatPartnerFinder = async () => {
			
			for (let i = 0; i < chatKey.length; i++) {
				const chatPartnerPair = await getChatPartnerPair(chatKey[i]).unwrap();
				
				helperSet.add(chatPartnerPair)
				
			}
			setAllchatPartnerPairs([...helperSet])
			
		}
		chatPartnerFinder();
	}, [])
	
	
	
	
	
	
	
	
	
	
	
	return (
		<>
			<Drawer
			open={contactsFlag}
			onClose={() => dispatch(changeContactsFlag())}
			anchor={"right"}
			variant="temporary"
			sx={{
				"& .MuiDrawer-paper": {
					width: 250,
				},
				display: { xs: "flex", smMd: "none" },
				flexDirection: "column",
			}}
			>
				<Box sx={{ padding: "0.7rem", height: 1 }}>
					
					<Typography variant="h5" sx={{ color: "#fff", textAlign: "center", fontSize: "14px" }} >
						
						Contacts
						
					</Typography>
					
					{
						allchatPartnerPairs?.length > 0 ? (
						allchatPartnerPairs.map((chatPair, index) => (
							<Contact key={index} chatPairDetails={chatPair} index={index} />
						))
						) :
						(
							<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "91%"
							}}
							>
								<Typography
								sx={{
									color: "#fff",
									fontSize: "0.9rem",
									textAlign: "center"
								}}
								>
									select the plus icon from the navbar and find a contact
								</Typography>
							</Box>
						)
					}
					
				</Box>
			</Drawer>
		</>
	)
}


export default ContactsDrawer;



