import { Box, List, Tab, Tabs } from "@mui/material"
import { FC, useEffect, useState } from "react";
import style from './style.module.css'
import { Dish, DishTypeLabels, DishTypes } from "../../models/dish";
import { DishListItem } from "../../components/dishListItem";
import { getDishes } from "../../api/dishes";

export const DishesPage: FC = () => {

    const [dishes, setDishes] = useState<Dish[]>([]);

    const [tab, setTab] = useState(DishTypes[0]);

    const [selected, setSelected] = useState<Dish | null>(null)

    useEffect(() => {
        getDishes().then(setDishes);
    }, [])

    return <Box className={style.mainBox}>
        <Tabs
            value={tab}
            onChange={(_, value) => setTab(value)}
        >
            {Object.keys(DishTypes).filter(key => Object.keys(DishTypeLabels).includes(key)).map(type => <Tab label={DishTypeLabels[type as any]} value={type} key={type} />)}
        </Tabs>
        <Box className={style.viewer}>
            <img className={style.picture} src="/logo512.png" />
            <List className={style.dishList}>
                {dishes.filter(dish => dish.type.toString() === tab).map(dish => <DishListItem dish={dish} active={dish === selected} key={dish.id} onClick={() => setSelected(dish)} />)}
            </List>
        </Box>
    </Box>
}