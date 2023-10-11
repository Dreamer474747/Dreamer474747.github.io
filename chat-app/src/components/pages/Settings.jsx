import { Box, TextField } from "@mui/material";

import { useSelector } from "react-redux";

import { selectUserInfo } from "../../reducers/userInfoSlice";





const Settings = () => {
	
	const userInfo = useSelector(selectUserInfo);
	
	
	
	
	return (
		<Box
		sx={{
			width: 1,
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center"
		}}
		>
		
			<TextField
			disabled
			variant="outlined"
			value={userInfo.username}
			label="username"
			sx={{ width: { xs: 1, sm: "60%", md: "40%" }, marginBottom: "1.5rem"}}
			/>
			
			<TextField
			disabled
			variant="outlined"
			value={userInfo.id}
			label="id"
			sx={{ width: { xs: 1, sm: "60%", md: "40%" }, marginBottom: "1.5rem" }}
			/>
			
			<TextField
			disabled
			variant="outlined"
			value={userInfo.password}
			label="password"
			sx={{ width: { xs: 1, sm: "60%", md: "40%" }, marginBottom: "1.5rem" }}
			/>
		
		</Box>
	)
}

export default Settings;