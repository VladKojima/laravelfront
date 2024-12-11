import { Container, Popper } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import style from "./style.module.css"

interface IOption<T> {
    x: number;
    y: number;
    label?: string;
    value: T;
}

interface IOptionsProps<T> {
    option: IOption<T>;
}

interface IProps<T> {
    img: string;
    options: IOption<T>[];
    onSelect?: (value: T) => void;
    PopperComponent?: FC<IOptionsProps<T>>;
}

export function OnImageSelect<T extends React.Key>({ img, options, onSelect, PopperComponent }: IProps<T>) {
    const imgRef = useRef<HTMLImageElement>(null);

    const [rect, setRect] = useState(imgRef.current?.getBoundingClientRect());

    const origHeight = imgRef.current?.naturalHeight ?? 1;
    const origWidth = imgRef.current?.naturalWidth ?? 1;

    const rectSize = Math.max(rect?.height ?? 0, rect?.width ?? 0);

    const scale = rectSize / Math.max(origHeight, origWidth);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const handler = () => setRect(imgRef.current?.getBoundingClientRect());

        window.addEventListener('resize', handler);

        return () => window.removeEventListener('resize', handler);
    }, [])

    const [popperOn, setPopperOn] = useState<HTMLElement | null>(null);
    const [poppedOption, setPoppedOption] = useState<IOption<T> | null>(null);

    return <Container sx={{
        display: 'flex',
        justifyContent: 'center',
        aspectRatio: 1,
        padding: '0 !important',
        height: '100%',
        width: '100%'
    }}>
        <img
            src={img}
            ref={imgRef}
            onDragStart={(e) => { e.preventDefault() }}
            onLoad={() => { setIsLoaded(true); setRect(imgRef.current?.getBoundingClientRect()) }}
            alt="TableSelector"
        />
        {isLoaded && options.map(option => <div
            key={option.value}
            className={style.opt}
            style={{
                top: `${(rect?.top ?? 0) + option.y * scale}px`,
                left: `${(rect?.left ?? 0) + option.x * scale}px`,
            }}
            onClick={() => onSelect?.(option.value)}
            onMouseEnter={({ currentTarget }) => {
                setPopperOn(currentTarget);
                setPoppedOption(option);
            }}
            onMouseLeave={() => {
                setPopperOn(null);
                setPoppedOption(null);
            }}
        >{option.label}</div>)}

        {PopperComponent && <Popper
            open={!!popperOn}
            anchorEl={popperOn}
            placement="right"
            sx={{
                zIndex: 1500,
            }}
        >
            <PopperComponent option={poppedOption!} />
        </Popper>}
    </Container>
}