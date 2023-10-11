import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, Avatar, Tabs, Tab, Fab } from "@mui/material";
import { BarsOutlined } from "@ant-design/icons"
import loginLogoutImg from "../../public/svgs/logout-login.svg";

import TabsDataArray from "../constants/TabsData";

import { selectUserInfo, userInfoEmpty } from "../reducers/userInfoSlice";








const Navbar = ({ selectedTabIndex, handleTabIndexChange }) => {
	
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const tabsData = TabsDataArray();
	
	const userInfo = useSelector(selectUserInfo);
	
	
	
	
	
	
	const logOut = () => {
		dispatch(userInfoEmpty());
		navigate("/sign-in");
	}
	
	
	
	

	
	return (
		<Box
		sx={{
			display: {
			xs: "none",
			sm: "none",
			md: "none",
			lg: "block",
			},
			width: "14%",
			marginRight: "3rem",
		}}
		>
      
			<Box
			sx={{
				width: "186px",
				height: "90vh",
				backgroundColor: "#1A66FF",
				borderRadius: "20px",
				border: "0.001px solid #FCEFEF",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "space-around",
        
			}}
			>
				<Avatar
				alt={userInfo?.username?.toUpperCase()}
				src="there-is-no-src"
				sx={{
					width: 100,
					height: 100,
					fontSize: "3rem",
					marginTop: "1rem",
					boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.5)",
					backgroundColor: "#FDAC53"
				}}
				/>
				
			
				<Box sx={{ width: "100%" }}>
					<Tabs
						orientation="vertical"
						value={selectedTabIndex}
						onChange={handleTabIndexChange}
						sx={{
							'& .MuiTabs-indicator': {
								width: '8px',
								borderTopLeftRadius: 20,
								borderBottomLeftRadius: 20,
								backgroundColor: "#FFE81A"
							}
						}}
					>
						
					{
						tabsData.map((tab, index) => (
							<Tab
							key={index}
							onClick={() => navigate(tab.path)}
							sx={{
								margin: "0 auto 1.5rem",
								padding: "1.3rem 0",
								width: 160,
								"&.Mui-selected": {
									backgroundColor: "#004BE1",
									borderTopLeftRadius: 20,
									borderBottomLeftRadius: 20,
									paddingRight: "1.5rem",
									marginLeft: "1.5rem",
								}
							}}
							icon = { selectedTabIndex === tab.index ? tab.filledIcon : tab.outlinedIcon }
							/>
						))
					}
					</Tabs>
				</Box>
			
				<img
				alt="login-logout"
				src={loginLogoutImg}
				style={{ cursor: "pointer" }}
				onClick={logOut}
				/>
			
			</Box>
		</Box>
	)
}

export default Navbar;
