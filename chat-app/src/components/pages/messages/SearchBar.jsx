import searchIcon from "../../../../public/svgs/search.svg";

import { Box } from "@mui/material";



const SearchBar = () => {
	return (
		<Box
			sx={{
				width: "100%",
				height: "55px",
				borderRadius: "20px",
				backgroundColor: "secondary.main",
				border: "1px solid rgba(255, 255, 255, 0.2)",
				display: "flex",
				alignItems: "center",
			}}
		>
			
				<img style={{ cursor: "pointer", margin: "0 1rem" }} src={searchIcon} />
				
				<input
					type="text"
					placeholder="Search"
					style={{
						backgroundColor: "#0d0d0d",
						outline: "none",
						border: "none",
						color: "white",
						height: "90%",
						width: "90%",
						fontSize: "16px",
						fontFamily: "PoppinsMedium",
						paddingTop: "4px",
						borderRadius: "20px"
					}}
				/>
			
		</Box>
	)
}

export default SearchBar;
