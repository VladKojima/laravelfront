import { useState } from "react";

export function usePromise<T>(promise: Promise<T>) {
    const [fulfilled, setFulfilled] = useState(false);

    const [value, setValue] = useState<T | undefined>(undefined);

    promise
        .then(result => { setValue(result); setFulfilled(true) });

    return [value, fulfilled];
}