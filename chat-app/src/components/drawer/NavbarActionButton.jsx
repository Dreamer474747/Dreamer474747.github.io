import { Box, Fab } from "@mui/material";

import { BarsOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";

import { changeNavbarFlag } from "../../reducers/sidebarSlice";






const NavbarActionButton = () => {
	
	const dispatch = useDispatch();
	
	
	return (
		<>
		<Box
			sx={{
				left: "5px",
				position: "absolute",
				top:"5px",
				display: {
					xs: "block",
					lg: "none"
				}
			}}
		>
			<Fab
			sx={{
				fontSize: "1.2rem",
				backgroundColor: "secondary.main",
				"&:hover": {
					backgroundColor: "#2f2f2f"
				}
			}}
			size="small"
			aria-label="navbar"
			onClick={() => dispatch(changeNavbarFlag())}
			>
			
			<BarsOutlined style={{ color:"#fff" }} />
		
			</Fab>
	
		</Box>
		</>
	)
}



export default NavbarActionButton;
