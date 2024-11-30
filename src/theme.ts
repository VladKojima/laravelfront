import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#ED825B",
            contrastText: "#F5FFFA",
        },
        secondary: {
            main: "#1E1E1E",
            contrastText: "#F0FFF0"
        },
        background: {
            paper: "#1E1E1E",
            default: "#000000"
        },
        text: {
            primary: "#F5FFFA",
            secondary: "#F0FFF0"
        },
    },
    components: {
        MuiContainer: {

        }
    }
})