import { Box } from "@mui/material"
import { FC, useState } from "react";
import { Dish, DishTypeLabels, DishTypes } from "../../models/dish";
import { DishListItem } from "../../components/dishListItem";
import { DishAgent } from "../../api/dishes";
import { usePromise } from "../../hooks/usePromise";
import { useOnMount } from "../../hooks/extendedUseEffect";
import { Loading } from "../../components/loading";
import { PageCenter } from "../../components/pageCenter";
import { MenuSelector } from "../../components/menuSelector";

export const DishesPage: FC = () => {

    const [getDishes, status, dishes] = usePromise(() => DishAgent.get());

    useOnMount(getDishes);

    const types = Object.keys(DishTypes)
        .filter(k => isNaN(k as any))
        .map(k => ({
            value: k,
            label: DishTypeLabels[k as any]
        }));

    return <PageCenter>
        <Box>
            <Loading status={status} />
            {status === 'fulfilled' && <MenuSelector
                keygen={(dish) => dish.id}
                OptionComponent={DishListItem}
                types={types}
                options={dishes!.map(dish => ({
                    value: dish,
                    type: types.find(t => t.value === dish.type as any)!,
                    image: dish.image
                }))
                }
            />}
        </Box>
    </PageCenter>
}