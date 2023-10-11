import { Box, Typography } from "@mui/material";

//import twoTick from "../../../../../../public/svgs/twoTick.svg";
//import oneTick from "../../../../../../public/svgs/oneTick.svg";
//import twoTickUnseen from "../../../../../../public/svgs/twoTickUnseen.svg";

import { formatDistanceToNow, format } from "date-fns";
import { enUS } from "date-fns/locale";
import { utcToZonedTime } from "date-fns-tz";









const ChatPartnerMessage = ({children, time, msgId}) => {
	
	const monthes = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
	
	const timeZone = "Asia/Tehran";
	const zonedDate = utcToZonedTime(new Date(time), timeZone)
	
	const currentMonth = zonedDate.getMonth();
	const currentDayOfTheMonth = zonedDate.getDate();
	
	const formattedTime = format(zonedDate, "hh:mma");
	const formattedDate = `${currentDayOfTheMonth} ${monthes[currentMonth]}, ${formattedTime}`;
	
	
	
	
	
	
	
	return (
		<>
			<Box
				id={msgId}
				sx={{
					width: "100%",
					display: "flex",
					justifyContent: "flex-start",
					position: "relative",
					marginTop: "0.5rem",
				}}
			>
				
				<Box
				sx={{
					backgroundColor: "#1b1b1b",
					padding: {xs: "1rem", sm: "1rem 2.5rem"},
					borderRadius: "10px",
					maxWidth: "434px"
				}}
				>
				
					<Typography
						sx={{ color: "#fff", fontFamily: "PoppinsMedium", fontSize: {xs: "12px", sm: "1rem"} }}
					>
					{children}
					</Typography>
	
					{/*<img
						src={twoTick}
						alt="tick or tick's"
						style={{
							position: "absolute",
							bottom: "3px",
							left: "3px",
							width: "15px"
						}}
					/>*/}
				</Box>
	
				<Box
				sx={{
					position: "absolute",
					width: "0",
					height: "0",
					bottom: "0",
					left: "-10px",
					borderWidth: "10px",
					borderStyle: "solid",
					borderColor: "transparent",
					borderTopColor: "#1b1b1b",
					transform: "rotate(180deg)",
					borderRadius: "4px"
				}}
				></Box>
	
			</Box>
			<Typography
				sx={{
					fontFamily: "PoppinsMedium",
					fontSize: "12px",
					color: "rgba(255, 255, 255, 0.25)",
					width: "100%",
					marginTop: "0.5rem",
					marginBottom: "1rem"
				}}
			>
				{formattedDate}
			</Typography>
		</>
	)
}

export default ChatPartnerMessage;
