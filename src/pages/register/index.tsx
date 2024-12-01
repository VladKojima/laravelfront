import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../models/user";

export const RegisterPage: FC = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    function handler(event: React.FormEvent) {
        event.preventDefault();

        new User({
            login,
            password,
            email,
            phone
        }).post();
    }

    return <Container sx={{ justifyItems: 'center' }}>
        <form onSubmit={handler}>
            <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'stretch', gap: 2, width: 300 }}>
                <Typography sx={{ alignSelf: 'center' }}>Регистрация</Typography>

                <TextField
                    required
                    title="Логин"
                    placeholder="Введите логин"
                    value={login}
                    onChange={({ target: { value } }) => setLogin(value)}
                />

                <TextField
                    required
                    title="Пароль"
                    placeholder="Введите пароль"
                    value={password}
                    type="password"
                    onChange={({ target: { value } }) => setPassword(value)}
                />

                <TextField
                    required
                    title="Email"
                    placeholder="Введите email"
                    value={email}
                    type="email"
                    onChange={({ target: { value } }) => setEmail(value)}
                />

                <TextField
                    required
                    title="Номер телефона"
                    placeholder="Введите номер телефона"
                    value={phone}
                    onChange={({ target: { value } }) => setPhone(value)}
                />

                <Button variant="contained" type="submit">
                    Зарегистрироваться
                </Button>
            </Box>
        </form>

    </Container>

}