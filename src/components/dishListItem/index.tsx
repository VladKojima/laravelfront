import { Button, ListItem, Typography, useTheme } from "@mui/material"
import { FC } from "react"
import { Dish } from "../../models/dish"

interface IProps {
    dish: Dish;
    active?: boolean;
    onClick?: () => void;
}

export const DishListItem: FC<IProps> = ({ dish, active, onClick }) => {
    const theme = useTheme()

    return <ListItem key={dish.id}>
        <Button
            variant="outlined"
            sx={{
                color: active ? theme.palette.primary.main : theme.palette.text.primary
            }}
            onClick={onClick}
        >
            <Typography>{dish.title}<br />{dish.cost} руб / {dish.weight}</Typography>
        </Button>
    </ListItem>
}