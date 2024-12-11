import { Button, ListItem, Typography, useTheme } from "@mui/material"
import { FC } from "react"
import { Dish } from "../../models/dish"

interface IProps {
    value: Dish;
    active?: boolean;
    onClick?: () => void;
}

export const DishListItem: FC<IProps> = ({ value, active, onClick }) => {
    const theme = useTheme()

    return <ListItem key={value.id}>
        <Button
            variant="outlined"
            sx={{
                color: active ? theme.palette.primary.main : theme.palette.text.primary
            }}
            onClick={onClick}
        >
            <Typography sx={{
                wordBreak: 'break-all'
            }} >{value.title}<br />{value.cost} руб / {value.weight}</Typography>
        </Button>
    </ListItem>
}