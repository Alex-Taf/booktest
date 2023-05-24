export interface IApi {
    getAppPath: () => string,
    readBooksData: () => Promise<any[]>,
    writeBooksData: (data: any) => Promise<any>,
    saveLocalFile: (data: any) => Promise<any>
}
