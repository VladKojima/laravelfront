import { Box, List, Tab, Tabs } from "@mui/material";
import { FC, useState } from "react";
import style from './style.module.css';
import React from "react";

interface IOption<T> {
    value: T;
    type: IType;
    image?: string;
}

interface IType {
    label?: string;
    value: string;
}

interface IProps<T> {
    options: IOption<T>[];
    types: IType[];
    OptionComponent: FC<IElementProps<T>>;
    keygen: (value: T) => React.Key;
    onClick?: (value: T) => void;
}

interface IElementProps<T> {
    value: T;
    active?: boolean;
    onClick?: () => void;
}

export function MenuSelector<T>({ options, types, OptionComponent, keygen, onClick }: IProps<T>) {
    const [tab, setTab] = useState(types[0].value);

    const [selected, setSelected] = useState<IOption<T> | null>(null)

    function changeTab(tab: string) {
        setSelected(null);
        setTab(tab);
    }

    return <Box className={style.mainBox}>
        <Tabs
            value={tab}
            onChange={(_, value) => changeTab(value)}
        >
            {types.map(type => <Tab label={type.label} value={type.value} key={type.value} />)}
        </Tabs>
        <Box className={style.viewer}>
            <>
                <Box sx={{
                    width: '50%',
                    height: '25%'
                }}>
                    {selected?.image && <img className={style.picture} src={selected?.image} />}
                </Box>
                <List className={style.list}>
                    {options
                        .filter(opt => opt.type.value === tab)
                        .map(opt =>
                            <OptionComponent
                                value={opt.value}
                                active={opt === selected}
                                onClick={() => { setSelected(opt); onClick?.(opt.value) }}
                                key={keygen(opt.value)}
                            />
                        )}
                </List></>
        </Box>
    </Box>
}