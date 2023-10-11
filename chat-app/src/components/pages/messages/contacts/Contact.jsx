import { useEffect, useState } from "react";

import { Box, Typography, Avatar, Divider } from "@mui/material";

//import oneTick from "../../../../../public/svgs/oneTick.svg";
//import twoTick from "../../../../../public/svgs/twoTick.svg";
//import twoTickUnseen from "../../../../../public/svgs/twoTickUnseen.svg";

import EllipsisText from "react-ellipsis-text";

import { formatDistanceToNow, format } from "date-fns";
import { enUS } from "date-fns/locale";
import { utcToZonedTime } from "date-fns-tz";

import {
useLazyGetChatMessagesQuery,
Messagescollected,
selectLastMessages
} from "../../../../reducers/chatSlice";
import { useLazyGetUserQuery } from "../../../../reducers/authSlice";

import { useDispatch, useSelector } from "react-redux";

import { selectUserInfo } from "../../../../reducers/userInfoSlice";

import { makeContactsFlagFalse } from "../../../../reducers/sidebarSlice";

import { setChatPartnerInfo } from "../../../../reducers/chatPartnerInfoSlice";

import toast from 'react-hot-toast';








const Contact = ({ chatPairDetails, index }) => {
	
	const dispatch = useDispatch();
	const [getUser] = useLazyGetUserQuery();
	
	
	const { id: userId } = useSelector(selectUserInfo);
	
	const { id: chatKey, chatPartnersIds } = chatPairDetails; 
	
	const allLastMessages = useSelector(selectLastMessages);
	
	
	const lastMessage = allLastMessages.find(lastM => lastM.id === chatKey);
	
	
	const { text, time: utcDate } = lastMessage.lastText;
	
	const [otherChatPartnerName, setOtherChatPartnerName] = useState("");
	
	const otherChatPartnerId = chatPartnersIds.find((id) => id !== userId)
	
	
	
	useEffect(() => {
		
		
		const otherChatPartnerFinder = async () => {
			
			const { data: otherChatPartnerInfo } = await getUser(otherChatPartnerId);
			setOtherChatPartnerName(otherChatPartnerInfo.username)
			
		}
		
		otherChatPartnerFinder();
		
	}, [])
	
	
	
	
	
	const colors = [
		"#00c853",
		"#03a9f4",
		"#3f51b5",
		"#009688",
		"#00b0ff",
		"#1de9b6",
		"#00e676",
		"#ffc400",
		"#00bcd4",
		"#ffab00"
	]
	
	const colorPicker = index => {
		if (index < 9) {
			return colors[index];
		} else if (index > 9 && index < 18) {
			return colors[index - 9];
		} else {
			return colors[index - 18];
		}
	}
	
	
	
	
	
	
	const monthes = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
	
	const timeZone = "Asia/Tehran";
	const zonedDate = utcToZonedTime(new Date(utcDate), timeZone)
	
	const currentMonth = zonedDate.getMonth();
	const currentDayOfTheMonth = zonedDate.getDate();
	
	const formattedTime = format(zonedDate, "hh:mma");
	const formattedDate = `${(currentDayOfTheMonth)} ${monthes[currentMonth]}, ${formattedTime}`;
	
	
	const [getChatMessages] = useLazyGetChatMessagesQuery();
	
	const messageCollector = async chatPlaceId => {
		const { data } = await getChatMessages(chatPlaceId);
		
		dispatch(Messagescollected(data));
	}
	
	
	const chatPartner = {
		chatPartnerName: otherChatPartnerName,
		chatKey,
		chatPartnerId: otherChatPartnerId
	}
	

	
	
	return (
	
		<Box
		sx={{
			width: "100%",
			marginBottom: "0.5rem",
			marginTop: "1rem",
			cursor: "pointer",
		}}
		onClick={() => {
			messageCollector(chatKey)
			dispatch(setChatPartnerInfo(chatPartner))
			dispatch(makeContactsFlagFalse())
		}}
		>
		
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					height: "70px",
					userSelect: "none"
				}}
			>
				
				<Avatar
					alt=""
					src="there-is-no-src"
					sx={{
						width: {xs: "60px", smMd: "70px"},
						height: {xs: "60px", smMd: "70px"},
						fontSize: {xs: "2.4rem", smMd: "2.8rem"},
						bgcolor: colorPicker(index),
						marginRight: "1rem"
					}}
				/>
				
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						flex: 1
					}}
				>
				
					<Box>

						<Typography
							sx={{
								fontSize: "18px",
								fontWeight: 600,
								color: "#fff",
							}}
						>
						
						{otherChatPartnerName}
						
						</Typography>
						
						<Typography
							sx={{
								color: "rgba(255, 255, 255, 0.75)",
								fontFamily: "PoppinsMedium",
								fontSize: "14px"
							}}
						>
						
							<EllipsisText text={text} length={11} />
						
						</Typography>
					
					</Box>
					
					<Box
						sx={{
							textAlign: "right",
							display: {
								xs: "none",
								md: "block",
							}
						}}
					>
					
						<Typography
							sx={{
								fontFamily: "PoppinsMedium",
								fontSize: {xs: "10px", lg: "12px"},
								color: "rgba(255, 255, 255, 0.5)",
								marginLeft: "0.4rem"
							}}
						>
						
						{formattedDate}
						
						</Typography>
						
						{/*<div style={{ marginRight: "0.6rem" }} >
							<img src={twoTick} alt="tick or tick's" />
						</div>*/}
					
					</Box>
					
				
				</Box>
			
			</Box>
			
			<Divider
				sx={{
					marginTop: "1rem",
					marginLeft: {xs: 0, lg: "0.5rem"},
					borderColor: "rgba(255, 255, 255, 0.25)"
				}}
			/>
		
		</Box>
	
	)
}

export default Contact;
