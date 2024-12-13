import { Box, Button, TextField, Typography } from "@mui/material"
import { FC, FormEventHandler, useState } from "react"
import { Link } from "react-router-dom";
import { PageCenter } from "../../components/pageCenter";
import { UserAgent } from "../../api/user";
import { User } from "../../models/user";

export const LoginPage: FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function submit(e: React.FormEvent) {
        e.preventDefault();

        UserAgent.login(new User({
            email,
            password
        }))
    }

    return <PageCenter>
        <form onSubmit={submit}>
            <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'stretch', gap: 2, width: 300 }}>
                <Typography sx={{ alignSelf: 'center' }}>Авторизация</Typography>

                <TextField
                    title="Email"
                    placeholder="Введите email"
                    value={email}
                    onChange={({ target: { value } }) => setEmail(value)}
                />

                <TextField
                    title="Пароль"
                    placeholder="Введите пароль"
                    value={password}
                    type="password"
                    onChange={({ target: { value } }) => setPassword(value)}
                />

                <Button variant="contained" type="submit">
                    Войти
                </Button>

                <Button variant="contained" component={Link} to="/register">
                    Регистрация
                </Button>
            </Box>
        </form>
    </PageCenter>
}