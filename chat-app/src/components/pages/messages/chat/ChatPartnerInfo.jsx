import { useEffect } from "react";

import { Box, Typography, Avatar, Divider } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

import { selectUserInfo } from "../../../../reducers/userInfoSlice";

import { selectChatPartnerInfo } from "../../../../reducers/chatPartnerInfoSlice";

import { useLazyGetChatPartnerPairQuery } from "../../../../reducers/chatSlice";




const ChatPartnerInfo = () => {
	
	const dispatch = useDispatch();
	
	const { chatPartnerName } = useSelector(selectChatPartnerInfo);
	
	
	
	
	
	
	return (
		<>
			<Box sx={{ display: "flex", alignItems: "center" }} >
					
				<Avatar
					alt=""
					src="there-is-no-src"
					sx={{
						width: {xs: "60px", sm: "75px"},
						height: {xs: "60px", sm: "75px"},
						fontSize: {xs: "2.3rem", sm: "2.8rem"},
						bgcolor: "red",
						marginRight: {xs: "1rem", sm: "1.3rem", md: "1.7rem", lg: "2.5rem"}
					}}
				/>
				
				<Box>
		
					<Typography
						sx={{
							fontSize: {xs: "14px", sm: "24px"},
							fontWeight: 600,
							color: "#fff",
						}}
					>
					
					{chatPartnerName? chatPartnerName : "Choose a chat"}
					
					</Typography>
				
				</Box>
				
			
			</Box>
					
			<Divider
				sx={{
          marginTop: {xs: "1rem", sm: "1.5rem"},
					marginLeft: "0.25rem",
					borderColor: "rgba(255, 255, 255, 0.25)"
				}}
			/>
		</>	
	)
}


export default ChatPartnerInfo;





//<Typography
//	sx={{
//		fontFamily: "PoppinsRegular",
//		fontSize: {xs: "12px", sm: "14px"},
//		color: "rgba(255, 255, 255, 0.85)"
//	}}
//>
//
//	Online
//
//</Typography>
//i will add this feature later.