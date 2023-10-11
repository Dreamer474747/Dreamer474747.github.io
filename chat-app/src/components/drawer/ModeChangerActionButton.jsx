import { Box, Fab } from "@mui/material";








const ModeChangerActionButton = () => {
	
	
	
	return (
		<>
			<Box
				sx={{
					position: "absolute",
					top:"5px",
					right: "50px",
				}}
			>
				<Fab
				sx={{
					fontSize: "12px",
					backgroundColor: "secondary.main",
					"&:hover": {
						backgroundColor: "#2f2f2f"
					},
					width: "25px",
					height: "25px",
				}}
				variant="extended"
				>
				
				light
			
				</Fab>
		
			</Box>
		</>
	)
}



export default ModeChangerActionButton;
