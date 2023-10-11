import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({baseUrl: "https://dreamer-chat-app.onrender.com"}),
	tagTypes: ["USER", "CHAT" ],
	endpoints: () => ({})
})














