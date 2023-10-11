import { useEffect, useState } from "react";

import Contact from "./Contact";
//import SearchBar from "../SearchBar";

import { Box, Typography } from "@mui/material";

import { selectUserInfo } from "../../../../reducers/userInfoSlice";
import { useLazyGetChatPartnerPairQuery, lastMessagesCollected } from "../../../../reducers/chatSlice";

import { useSelector, useDispatch } from "react-redux";












const Contacts = () => {
	
	const dispatch = useDispatch();
	
	const { chatKey, id: userId } = useSelector(selectUserInfo);
	
	
	const [getChatPartnerPair] = useLazyGetChatPartnerPairQuery();
	
	const [allchatPairs, setAllchatPairs] = useState([]);
	
	const helperSet = new Set();
	
	useEffect(() => {
		const chatPartnerFinder = async () => {
			
			for (let i = 0; i < chatKey?.length; i++) {
				const chatPartnerPair = await getChatPartnerPair(chatKey[i]).unwrap();
				
				helperSet.add(chatPartnerPair)
				
				
				
			}
			setAllchatPairs([...helperSet])
			
			const helperObject = Object.values({...[...helperSet]});
			
			dispatch(lastMessagesCollected(helperObject));
			
			
		}
		chatPartnerFinder();
	}, [])
	
	
	
	
	
	
	
	
	
	
	
	
	return (
		<>
	
			
				<Box
					sx={{
						width: "33.78%",
						height: "90vh",
						marginRight: "3rem",
						display: {
							xs: "none",
							sm: "none",
							smMd: "flex"
						},
						flexDirection: "column",
					}}
				>
				
					{/*<SearchBar />*/}
					
					<Box
						sx={{
							//marginTop: {smMd: "1rem", md: "1rem", lg: "3rem"},
							backgroundColor: "secondary.main",
							width: "100%",
							flex: 1,
							paddingRight: "1.4rem",
							borderRadius: "20px",
							border: "1px solid rgba(255, 255, 255, 0.2)",
							padding: "1rem 1.85rem 1rem 1.2rem",
							display: "flex",
							flexDirection: "column",
							overflowY: "scroll",
						}}
					>
					
						<Typography variant="h5" sx={{ fontSize: "20px", color: "#fff", marginBottom: "0.5rem" }} >
						
						Contacts
						
						</Typography>
						
						{
							allchatPairs?.length > 0 ? (
							allchatPairs.map((chatPair, index) => (
								<Contact key={index} chatPairDetails={chatPair} index={index} />
							))
							) :
							(
								<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									height: "86%"
								}}
								>
									<Typography
									sx={{
										color: "#fff",
										fontSize: {xs: "10px", sm: "14px", smMd: "1rem", lg: "1.2rem"},
										textAlign: "center"
									}}
									>
										select the plus icon and find a contact
									</Typography>
								</Box>
							)
						}
						
					</Box>
						
				</Box> 
	
		</>
  )
}


export default Contacts;

