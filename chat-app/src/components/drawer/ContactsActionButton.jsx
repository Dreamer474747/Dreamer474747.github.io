import { Box, Fab } from "@mui/material";

import { UserOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";

import { changeContactsFlag } from "../../reducers/sidebarSlice";




const ContactsActionButton = () => {
	
	const dispatch = useDispatch();
	
	
	
	return (
		<>
			<Box
				sx={{
					position: "absolute",
					right: "5px",
					top:"5px",
					display: {
						xs: "block",
						smMd: "none"
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
				onClick={() => dispatch(changeContactsFlag())}
				>
				
				<UserOutlined style={{ color:"#fff" }} />
			
				</Fab>
		
			</Box>
		</>
	)
}



export default ContactsActionButton;
