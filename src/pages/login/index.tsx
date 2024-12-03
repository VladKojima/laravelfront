import { Box, Button, TextField, Typography } from "@mui/material"
import { FC, useState } from "react"
import { Link } from "react-router-dom";
import { PageCenter } from "../../components/pageCenter";

export const LoginPage: FC = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    return <PageCenter>
        <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'stretch', gap: 2, width: 300 }}>
            <Typography sx={{ alignSelf: 'center' }}>Авторизация</Typography>

            <TextField
                title="Логин"
                placeholder="Введите логин"
                value={login}
                onChange={({ target: { value } }) => setLogin(value)}
            />

            <TextField
                title="Пароль"
                placeholder="Введите пароль"
                value={password}
                type="password"
                onChange={({ target: { value } }) => setPassword(value)}
            />

            <Button variant="contained">
                Войти
            </Button>

            <Button variant="contained" component={Link} to="/register">
                Регистрация
            </Button>
        </Box>
    </PageCenter>
}