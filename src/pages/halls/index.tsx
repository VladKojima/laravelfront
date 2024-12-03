import { Box, Container, Typography, useTheme } from "@mui/material"
import { FC } from "react"
import style from "./style.module.css";
import { HallAgent } from "../../api/halls";
import { usePromise } from "../../hooks/usePromise";
import { useOnMount } from "../../hooks/extendedUseEffect";
import { Loading } from "../../components/loading";
import { PageCenter } from "../../components/pageCenter";

export const HallsPage: FC = () => {
    const [getHalls, status, halls] = usePromise(() => HallAgent.get())

    useOnMount(getHalls);

    const theme = useTheme();

    return <Container>
        <PageCenter><Loading status={status} onRetry={getHalls} /></PageCenter>
        {status === 'fulfilled' &&
            halls!.map(hall => <Box key={hall.id} sx={{
                border: `dashed 2px ${theme.palette.primary.main}`,
                padding: 1,
                marginBottom: 1
            }}>
                <img src={hall.img} className={style.avatar} alt={hall.name} />

                <Typography sx={{
                    justifySelf: 'center',
                    fontWeight: 'bold',
                    fontSize: '2em'
                }}>{hall.name}</Typography>

                <Typography sx={{
                    justifySelf: 'center'
                }}
                >{hall.description}</Typography>
            </Box>)
        }
    </Container>
}