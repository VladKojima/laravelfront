import { Box, Button, Checkbox, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { User } from "../../models/user";
import { UserAgent } from "../../api/user";
import { PageCenter } from "../../components/pageCenter";

export const RegisterPage: FC = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [accept, setAccept] = useState(false);

    function handler(event: React.FormEvent) {
        event.preventDefault();
        if (!accept)
            return;

        UserAgent.save(
            new User({
                login,
                password,
                email,
                phone
            }));
    }

    return <PageCenter>
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

                <Box sx={{
                    display: 'flex'
                }}>
                    <Checkbox
                        checked={accept}
                        onChange={() => setAccept(!accept)}
                    />
                    <Typography>Согласен на обработку персональных данных</Typography>
                </Box>

                <Button variant="contained" type="submit" disabled={!accept}>
                    Зарегистрироваться
                </Button>
            </Box>
        </form>

    </PageCenter>

}