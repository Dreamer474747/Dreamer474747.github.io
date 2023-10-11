import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { skipToken } from "@reduxjs/toolkit/query";

import { Box, Typography, Button, TextField } from "@mui/material";
import { styled } from "@mui/system";

import { Formik, Form, Field, ErrorMessage } from "formik";

import toast, { Toaster } from 'react-hot-toast';

import { signInSchema } from "../validation/Validation";

import { useGetUserQuery } from "../reducers/authSlice";

import { userLogged } from "../reducers/userInfoSlice";







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
	const dispatch = useDispatch();
	
	
	const [formValues, setFormValues] = useState({});
	
	const [ id, setId ] = useState(skipToken);
	
	const { data: user } = useGetUserQuery(id);
	
	
	useEffect(() => {
		if (formValues && user) {
			if (formValues.password === user.password) {
				
				dispatch(userLogged(user));
				navigate("/home-page");
				
			} else {
				toast.error("The password and id do not match. remember to set you're keyboard language to english.", {style: {fontFamily: "PoppinsMedium"}})
			}
		}
		
		
	}, [formValues, user])
	
	
	
	
	return (
		<Box sx={{ flex: 1, height: "100vh", backgroundColor: "primary.main", paddingTop: "4rem" }}>
			
			<Toaster position="top" reverseOrder={false} />
			
			<StyledBox
			sx={{
				margin: "0 auto 0",
				width: "280px",
				height: "260px",
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
					Sign in
				</Typography>
			
				
				
				<Formik
				initialValues={{ id: "", password: "" }}
				validationSchema={signInSchema}
				onSubmit={(values) => {
					setFormValues(values);
					setId(values.id)
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
							name="id"
							placeholder="you're user id"
							/>
							<ErrorMessage
							name="id"
							render={ (msg) => (
								<Box
								sx={{
									color: "#008080",
									fontSize: "10.5px",
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
									fontSize: "10.5px",
									fontFamily: "PoppinsMedium"
								}}
								>
									{msg}
								</Box>
							)}
							/>
						</Box>
						
						<Button type="submit" sx={{ width: "100%" }}>sign in</Button>
						
					</Form>
				
				</Formik>
				
				<Button
				onClick={() => navigate("/")}
				sx={{ width: 1, color: "#FFA500", textTransform: "none", fontSize: "10px", marginTop: "0.2rem" }}
				>
					you don't have an account? Sign up
				</Button>
				
			</StyledBox>
		
		</Box>
	)
}

export default SignUp;




