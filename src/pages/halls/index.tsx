import { Box, Container, Typography, useTheme } from "@mui/material"
import { FC, useEffect, useState } from "react"
import { getHalls } from "../../api/halls";
import { Hall } from "../../models/hall";
import style from "./style.module.css";

export const HallsPage: FC = () => {
    const [halls, setHalls] = useState<Hall[]>([]);

    const theme = useTheme();

    useEffect(() => {
        getHalls().then(setHalls);
    }, []);

    return <Container>
        {
            halls.map(hall => <Box key={hall.id} sx={{
                border: `dashed 2px ${theme.palette.primary.main}`,
                padding: 1,
                marginBottom: 1
            }}>
                <img src={hall.img} className={style.avatar} />

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