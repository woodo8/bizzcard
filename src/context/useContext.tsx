import { createContext } from "react";

export type contextType = {
    globalUser: any,
    setGlobalUser: (param: any) => void
}

export const StateContext = createContext<contextType>({
    globalUser: {},
    setGlobalUser: () => { },
});