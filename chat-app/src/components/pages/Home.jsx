import { Link } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import { useSelector } from "react-redux";

import { selectUserInfo } from "../../reducers/userInfoSlice";

import { LinkedinOutlined, GithubOutlined } from "@ant-design/icons";

import { styled } from '@mui/material/styles';







const Home = () => {
  
	const userInfo = useSelector(selectUserInfo);
	
	const LinkedinHoverableIcon = styled(LinkedinOutlined)`
		font-size: 3rem;
		color: #555;
		transition: 0.2s;
		&:hover {
			color: #888;
		}
	`;

	const GithubHoverableIcon = styled(GithubOutlined)`
		font-size: 3rem;
		color: #555;
		transition: 0.2s;
		&:hover {
			color: #888;
		}
	`;
  
  
  
	return (
		<>
			<Box
			sx={{
				margin: "0 auto",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-around"
			}}
			>
			
				<Typography sx={{ textAlign: "center", color: "#fff", fontSize: { xs: "1rem", sm: "1.3rem", md: "2rem" } }}>
					Hello, and wellcome to this free chat app {userInfo.username}
				</Typography>
				
				<Box>
					<Typography sx={{ textAlign: "center", color: "#fff", fontSize: { xs: "1rem", sm: "1.34rem", md: "2rem" } }}>
						this application was made by mobin taataghi,
					</Typography>
					
					<Typography sx={{ textAlign: "center", color: "#fff", fontSize: { xs: "1rem", sm: "1.34rem", md: "2rem" } }}>
						a young and passionate front end developer.
					</Typography>
				</Box>
				
				<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
				
					<Typography sx={{ textAlign: "center", color: "#fff", fontSize: { xs: "1rem", sm: "1.4rem", md: "2rem" } }}>
						you can contact me from here:
					</Typography>
					
					<a style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }} href="https://www.linkedin.com/in/mobin-taataghi/" target="_blank" rel="noopener noreferrer">
						<LinkedinHoverableIcon />
					</a>
					
					<Typography sx={{ textAlign: "center", color: "#fff", fontSize: { xs: "1rem", sm: "1.4rem", md: "2rem" } }}>
						check out my other projects from here:
					</Typography>
					
					<a style={{ marginTop: "0.5rem" }} href="https://github.com/Dreamer474747" target="_blank" rel="noopener noreferrer">
						<GithubHoverableIcon />
					</a>
					
				</Box>
				
			</Box>
		</>
	)
}

export default Home;
