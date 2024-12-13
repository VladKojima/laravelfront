import { FC, useContext, useEffect, useRef, useState } from "react";
import { PageCenter } from "../../components/pageCenter";
import { Box, Typography } from "@mui/material";
import { usePromise } from "../../hooks/usePromise";
import { api } from "../../api/api";
import { useOnMount } from "../../hooks/extendedUseEffect";
import { useNavigate } from "react-router-dom";
import { PaymentContext } from "../../utils/contexts";

export const ReservationStatus: FC = () => {
    const [load, status, payment] = usePromise(() => api.get(`/payments/check/${localStorage.getItem('checkId')}`).then(res => res.data));

    const timer = useRef(0);

    useOnMount(() => {
        timer.current = setInterval(load, 3000) as any;
        return () => clearInterval(timer.current);
    });

    const [msg, setMsg] = useState("");

    const nav = useNavigate();

    const [, setCheck] = useContext(PaymentContext);

    useEffect(() => {
        if (status === 'fulfilled') {
            setMsg(payment);

            if (payment === 'successful' || payment === 'cancelled') {
                localStorage.removeItem('checkId');
                clearInterval(timer.current);

                setTimeout(() => {
                    setCheck(false);
                    nav("/");
                }, 5000);
            }
        }

    }, [status])

    return <PageCenter>
        <Box>
            {
                (msg === "" || msg === "pending") && <Typography>
                    Ожидание оплаты бронирования...
                </Typography>
            }
            {
                msg === "successful" && <Typography>
                    Оплата проведена успешно. Переход на главную через 5 секунд...
                </Typography>
            }
            {
                msg === "cancelled" && <Typography>
                    Оплата отменена. Переход на главную через 5 секунд...
                </Typography>
            }

        </Box>
    </PageCenter>
}