import { Paper } from "@mui/material";
import { FC, ReactNode } from "react";
import style from "./style.module.css";

interface IProps {
    children: ReactNode
}

export const Page: FC<IProps> = (props) => {
    return <Paper className={style.paper}>
        {props.children}
    </Paper>
}