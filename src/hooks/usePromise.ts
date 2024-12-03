import { useCallback, useState } from "react";

type Statuses = "inited" | "pending" | "fulfilled" | "rejected";

export function usePromise<T, P extends unknown[]>(promise: (...args: P) => Promise<T>): [(...props: P) => void, Statuses, T | undefined, Error | undefined] {
    const [status, setStatus] = useState<Statuses>("inited");

    const [value, setValue] = useState<T | undefined>(undefined);
    const [error, setError] = useState<Error | undefined>(undefined);

    const start = useCallback((...props: P) => {
        setStatus('pending');
        setValue(undefined);
        setError(undefined);
        promise(...props)
            .then(result => { setValue(result); setStatus("fulfilled") })
            .catch(error => { setError(error); setStatus("rejected") });
    }, [promise]);

    return [start, status, value, error];
}