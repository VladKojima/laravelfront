import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Redirector: FC = () => {
    const nav = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("checkId"))
            nav("/preservation/status");
        else nav("/main");
    }, []);

    return <>
    Перенаправление...
    </>
}