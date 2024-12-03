import { Button, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import { useOnMount } from "../../hooks/extendedUseEffect";
import { AboutPageAgent } from "../../api/aboutpage";
import { usePromise } from "../../hooks/usePromise";
import { PageCenter } from "../../components/pageCenter";
import { Loading } from "../../components/loading";

export const MainPage: FC = () => {
    const [getInfo, status, info] = usePromise(() => AboutPageAgent.get());

    useOnMount(getInfo);

    return <PageCenter>
        <Loading status={status} onRetry={getInfo} />
        {
            status === "fulfilled" && <>
                <img src={info?.image_url} className={style.avatar} alt="Картинка кафе" />
                <Typography>{info?.description}</Typography>
                <Button component={Link} to="/dishes">Посмотреть блюда</Button>
                <Button component={Link} to="/halls">Посмотреть залы</Button>
                <Button component={Link} to="/preservation">Перейти к бронированию</Button>
            </>
        }
    </PageCenter>
}