import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider } from "react-router-dom";

import { router } from "./routes/routes.jsx";

import { Provider } from "react-redux";
import { store } from "./store/store";

import "react-confirm-alert/src/react-confirm-alert.css";




createRoot(document.getElementById('root')).render(
<StrictMode>
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
</StrictMode>,
)
