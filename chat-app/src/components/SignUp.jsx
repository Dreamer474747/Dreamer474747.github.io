import { Link, useNavigate } from "react-router-dom";

import { Box, Typography, Button, TextField } from "@mui/material";
import { styled } from "@mui/system";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { signUpSchema } from "../validation/Validation";
import { useCreateNewUserMutation } from "../reducers/authSlice";

import toast, { Toaster } from 'react-hot-toast';








const SignUp = () => {
	
	const StyledBox = styled(Box)`
	& input::placeholder {
		font-size: 12px;
		color: #fff;
	}
	& input {
		color: #fff;
		font-size: 12px;
		width: 14rem;
	}
	`;
	
	const navigate = useNavigate();
	
	const [createNewUser] = useCreateNewUserMutation();
	
	
	const userCreator = async newUser => {
		newUser.chatKey = [];
		
		const { error } = await createNewUser(newUser);
		
		try{
			
			if (error?.originalStatus === 500) {
				toast.error("this id is already taken", {style: {fontFamily: "PoppinsMedium"}})
			} else {
				navigate("/sign-in")
			}
		
		} catch(err) {
			
			console.log(err)
			
		}
	}
	
	
	
	
	
	
	
	
	
	
	return (
		<Box sx={{ flex: 1, height: "100vh", backgroundColor: "primary.main", paddingTop: "4rem" }}>
			
			<Toaster position="top-center" reverseOrder={false} />
			
			<StyledBox
			sx={{
				margin: "0 auto 0",
				width: "280px",
				height: "330px",
				backgroundColor: "#1b1b1b",
				borderRadius: "15px",
				boxShadow: "4px 4px 7px 0px rgba(0,0,0,0.4)",
				padding: "1rem 0",
				display: "flex",
				flexDirection: "column",
			}}>
				
				<Typography
				variant="h5"
				sx={{
					textAlign: "center",
					color: "#fff",
					marginBottom: "1.5rem"
				}}
				>
					Sign up
				</Typography>
			
				
				
				<Formik
				initialValues={{
					username: "",
					id: "",
					password: ""
				}}
				validationSchema={signUpSchema}
				onSubmit={(values, { resetForm }) => {
					userCreator(values);
					resetForm();
				}}
				>
			
					<Form
					style={{
						height: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
					>
					
						<Box sx={{ marginBottom: "1rem" }}>
							<Field
							as={TextField}
							variant="standard"
							type="text"
							name="username"
							placeholder="you're user name"
							/>
							<ErrorMessage
							name="username"
							render={(msg) => (
								<Box sx={{
									color: "#008080",
									fontSize: "11px",
									fontFamily: "PoppinsMedium"
								}}
								>
									{msg}
								</Box>
							)}
							/>
						</Box>
						
						<Box sx={{ marginBottom: "1rem" }}>
							<Field
							as={TextField}
							variant="standard"
							type="text"
							name="id"
							placeholder="you're user id"
							/>
							<ErrorMessage
							name="id"
							render={ (msg) => (
								<Box
								sx={{
									color: "#008080",
									fontSize: "10px",
									fontFamily: "PoppinsMedium"
								}}
								>
									{msg}
								</Box>
							)}
							/>
						</Box>
						
						<Box sx={{ marginBottom: "0.5rem" }}>
							<Field
							as={TextField}
							variant="standard"
							type="password"
							name="password"
							placeholder="you're password"
							/>
							<ErrorMessage
							name="password"
							render={ (msg) => (
								<Box
								sx={{
									color: "#008080",
									fontSize: "11px",
									fontFamily: "PoppinsMedium"
								}}
								>
									{msg}
								</Box>
							)}
							/>
						</Box>
						
						<Button type="submit" sx={{ width: "100%" }}>sign up</Button>
						
					</Form>
				
				</Formik>
				
				<Button
				onClick={() => navigate("/sign-in")}
				sx={{ width: 1, color: "#FFA500", textTransform: "none", fontSize: "10px" }}
				>
					already have an account? Sign in
				</Button>
				
			</StyledBox>
		
		</Box>
	)
}

export default SignUp;




