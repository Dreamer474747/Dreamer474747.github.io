import { createTheme } from "@mui/material/styles";




export const lightTheme = createTheme({
	palette: {
		mode: "light",
		default: {
			main: "#222"
		},
    primary: {
      main: "#1A66FF"
    },
		secondary: {
			main: "#0d0d0d"
		}
	},
	typography: {
		fontFamily: "PoppinsSemiBold, PoppinsRegular, PoppinsMedium, PoppinsBold",
	},
  breakpoints: {
      values: {
        xs: 0,
        sm: 568,
        smMd: 768,
        md: 992,
        lg: 1200,
        xl: 1536,
      },
  },
})


export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		default: {
			main: "#222"
		},
    primary: {
      main: "#1A66FF"
    },
		secondary: {
			main: "#0d0d0d"
		}
	},
	typography: {
		fontFamily: "PoppinsSemiBold, PoppinsRegular, PoppinsMedium, PoppinsBold",
	},
  breakpoints: {
      values: {
        xs: 0,
        sm: 568,
        smMd: 768,
        md: 992,
        lg: 1200,
        xl: 1536,
      },
  },
})











