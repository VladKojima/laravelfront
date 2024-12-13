import { createContext, useState } from "react";

export const PaymentContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([] as any);