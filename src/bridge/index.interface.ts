export interface IApi {
    getAppPath: () => string,
    deleteLocalFile: (dir: string) => void,
    saveLocalFile: (data: any) => Promise<any>
}
