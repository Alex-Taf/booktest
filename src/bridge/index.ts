import { IApi } from "./index.interface"

export const useBridge = (): IApi => {
    return window.api
}
