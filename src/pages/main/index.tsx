import { Button, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";

export const MainPage: FC = () => {
    return <>
        <img src="/avatar.jpg" className={style.avatar} />
        <Typography>Добро пожаловать в наше социальное кафе "Lara Pohapen"</Typography>
        <Button component={Link} to="/dishes">Посмотреть блюда</Button>
        <Button component={Link} to="/halls">Посмотреть залы</Button>
        <Button component={Link} to="/preservation">Перейти к бронированию</Button>
    </>

}