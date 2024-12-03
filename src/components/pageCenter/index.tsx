import { Container } from "@mui/material";
import { FC, ReactNode } from "react";

interface IProps {
    children: ReactNode
}

export const PageCenter: FC<IProps> = (props) => {
    return <Container sx={{ justifyItems: 'center', minHeight: "75vh", alignContent: 'center' }}>
        {props.children}
    </Container>
}