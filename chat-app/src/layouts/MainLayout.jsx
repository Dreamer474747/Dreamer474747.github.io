import { useState, useEffect } from "react";

import { ThemeProvider, useTheme, useMediaQuery } from "@mui/material";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Grid from "@mui/material/Unstable_Grid2";

import { lightTheme, darkTheme } from "../ui/Theme";

import { Outlet, useNavigate } from "react-router-dom";

import { Toaster } from 'react-hot-toast';

import { useSelector, useDispatch } from "react-redux";

import { makeNavbarFlagFalse, makeContactsFlagFalse } from "../reducers/sidebarSlice";

import { Navbar } from "../components";

import { NavbarActionButton, ModeChangerActionButton, NavbarDrawer } from "../components/drawer";

import { selectUserInfo } from "../reducers/UserInfoSlice";






const MainLayout = () => {
	
	const dispatch = useDispatch();
	const myTheme = useTheme();
	const theme = darkTheme;
	const navigate = useNavigate();
	
	
	const pathName = window.location.href.replace("https://dreamer474747.github.io/chat-app", "")
	
	const pathNameArray = [
		"/home-page",
		"/home-page/messages",
		"/home-page/create",
		"/home-page/settings"
	]
	
	
	let currentPath = pathNameArray.indexOf(pathName);
	
	useEffect(() => {
		
		setSelectedTabIndex(currentPath)
		
	}, [window.location.href])
	
	const [selectedTabIndex, setSelectedTabIndex] = useState(currentPath);
	
	const handleTabIndexChange = (event, newTabIndex) => setSelectedTabIndex(newTabIndex);
	
	
	
	
	
	
	
	
	
	const userInfo = useSelector(selectUserInfo);
	
	
	useEffect(() => {
		if (Object.keys(userInfo).length === 0) {
			navigate("/sign-in");
		}
	}, []);
	
	
	useEffect(() => {
		
		const handleReload = event => {
			event.preventDefault();
			event.returnValue = "";
		}
		
		window.addEventListener("beforeunload", handleReload)
		
		return () => {
			window.removeEventListener("beforeunload", handleReload)
		}
	})
	
	
	
	
	const isLgUp = useMediaQuery(myTheme.breakpoints.up("lg"))
	const isSmMdUp = useMediaQuery(myTheme.breakpoints.up("768"))
	
	useEffect(() => {
		
		dispatch(makeNavbarFlagFalse())
		dispatch(makeContactsFlagFalse())
		
	}, [isLgUp, isSmMdUp])
	
	
	
	
	return (
		
		<ThemeProvider theme={theme}>
			
			<HelmetProvider>
			
				<Helmet>
					<title>remader chat</title>
				</Helmet>
				
				<Grid
				container
				sx={{
					backgroundColor: theme.palette.mode === "dark"? "default.main": "primary.main",
					width: "100%",
					height: "100vh",
					padding: "2.5rem 2rem",
					display: "flex"
				}}
				>
					<Toaster position="top-center" reverseOrder={false} />
					<NavbarActionButton />
					
					<NavbarDrawer
					selectedTabIndex={selectedTabIndex}
					handleTabIndexChange={handleTabIndexChange}
					/>
					
					<Navbar
						selectedTabIndex={selectedTabIndex}
						handleTabIndexChange={handleTabIndexChange}
					/>
					
					<div style={{ height: "80vh", flexGrow: 1, display: "flex" }}>
						<Outlet />
					</div>
					
				</Grid>
				
			</HelmetProvider>
			
		</ThemeProvider>
		
	)
}

export default MainLayout;

