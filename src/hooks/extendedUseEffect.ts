import { useEffect } from "react";

export function useOnMount(handler: () => void) {
    useEffect(handler, []);
}