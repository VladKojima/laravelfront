import { Container } from "@mui/material";
import { useRef, useState } from "react";
import style from "./style.module.css"

interface IOption<T> {
    x: number;
    y: number;
    label?: string;
    value: T;
}

interface IProps<T> {
    img: string;
    options: IOption<T>[];
    onSelect?: (value: T) => void;
}

export function OnImageSelect<T extends React.Key>({ img, options, onSelect }: IProps<T>) {
    const imgRef = useRef<HTMLImageElement>(null);

    const rect = imgRef.current?.getBoundingClientRect();

    const origHeight = imgRef.current?.naturalHeight ?? 1;
    const origWidth = imgRef.current?.naturalWidth ?? 1;

    const rectSize = rect?.height ?? 0;

    const scale = rectSize / Math.max(origHeight, origWidth);

    const top = (rectSize - origHeight * scale) / 2;
    const left = (rectSize - origWidth * scale) / 2;

    const [isLoaded, setIsLoaded] = useState(false);

    return <Container sx={{
        display: 'flex',
        justifyContent: 'center',
        aspectRatio: 1,
        padding: '0 !important'
    }}>
        <img
            src={img}
            className={style.img}
            ref={imgRef}
            onDragStart={(e) => { e.preventDefault() }}
            onLoad={() => setIsLoaded(true)}
            alt="TableSelector"
        />
        {isLoaded && options.map(option => <div
            key={option.value}
            className={style.opt}
            style={{
                top: `${(rect?.top ?? 0) + top + option.y * scale}px`,
                left: `${(rect?.left ?? 0) + left + option.x * scale}px`,
            }}
            onClick={() => onSelect?.(option.value)}
        >{option.label}</div>)}
    </Container>
}