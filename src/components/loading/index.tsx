import { Button, CircularProgress, Container, Typography } from "@mui/material";
import { FC } from "react";

interface IProps {
    loadingMsg?: string;
    errorMsg?: string;
    status: "pending" | "fulfilled" | "rejected" | "inited";
    onRetry?: () => void;
}

export const Loading: FC<IProps> = ({ status, loadingMsg, errorMsg, onRetry }) => {
    if (status === "fulfilled" || status === "inited")
        return null;

    return <Container sx={{
        display: 'flex',
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Typography>{status === 'pending' ? loadingMsg ?? "Загрузка данных" : errorMsg ?? "Ошибка загрузки"}</Typography>
        {status === "pending" && <CircularProgress />}
        {status === "rejected" && <Button onClick={() => onRetry?.()}>Повторить загрузку</Button>}
    </Container>
}