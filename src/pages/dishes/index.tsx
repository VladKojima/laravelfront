import { Box, List, Tab, Tabs } from "@mui/material"
import { FC, useState } from "react";
import style from './style.module.css'
import { Dish, DishTypeLabels, DishTypes } from "../../models/dish";
import { DishListItem } from "../../components/dishListItem";
import { DishAgent } from "../../api/dishes";
import { usePromise } from "../../hooks/usePromise";
import { useOnMount } from "../../hooks/extendedUseEffect";
import { Loading } from "../../components/loading";

export const DishesPage: FC = () => {

    const [getDishes, status, dishes] = usePromise(() => DishAgent.get());

    const [tab, setTab] = useState(DishTypes[0]);

    const [selected, setSelected] = useState<Dish | null>(null)

    useOnMount(getDishes);

    function changeTab(tab: string) {
        setSelected(null);
        setTab(tab);
    }

    return <Box className={style.mainBox}>
        <Tabs
            value={tab}
            onChange={(_, value) => changeTab(value)}
        >
            {Object.keys(DishTypes).filter(key => Object.keys(DishTypeLabels).includes(key)).map(type => <Tab label={DishTypeLabels[type as any]} value={type} key={type} />)}
        </Tabs>
        <Box className={style.viewer}>
            {status === 'fulfilled' && <>
                <Box sx={{
                    width: '50%',
                    height: '25%'
                }}>
                    {selected?.image && <img className={style.picture} src={selected?.image} alt={selected?.title} />}
                </Box>
                <List className={style.dishList}>
                    {dishes!.filter(dish => dish.type.toString() === tab).map(dish => <DishListItem dish={dish} active={dish === selected} key={dish.id} onClick={() => setSelected(dish)} />)}
                </List></>}
            <Loading status={status} onRetry={getDishes} />
        </Box>
    </Box>
}