import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import { Messages, Create, Settings, Home } from "../components/pages";

import { SignUp, SignIn } from "../components";





export const router = createBrowserRouter([
	{
		path: "/",
		element: <SignUp />,
	},
	{
		path: "/sign-in",
		element: <SignIn />
	},
	{
		path: "/home-page",
		element: <MainLayout />,
		errorElement: <h1 style={{textAlign:"center"}}>برگرد عقب داداش برگرد عقب</h1>,
		children: [
			{
				path: "/home-page",
				element: <Home />
			},
			{
				path: "/home-page/messages",
				element: <Messages />
			},
			{
				path: "/home-page/create",
				element: <Create />
			},
			{
				path: "/home-page/settings",
				element: <Settings />
			}
		]
	}
]);