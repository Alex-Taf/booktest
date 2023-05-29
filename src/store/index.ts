import { defineStore } from 'pinia'
import router from '../router'
import { useBridge } from '../bridge'
import { read, utils } from 'xlsx';
import { LDB } from '../utils';

const ldb = new LDB()
const bridge = useBridge()

export const useStore = defineStore({
    id: 'store',
    state: () => ({
        password: '12345678',
        currentBook: {},
        books: [],
        parsedData: {},
        dataset: [] as any,
        allTests: [] as any,
        testsTotal: 0,
        sheetsTotal: 0,
        allTestsNames: [] as any,
        currentTest: {} as any,
        activeSheet: [] as any,
        activeQuestion: {} as any,
    }),
    getters: {
        currBook: (state) => state.currentBook,
        booksList: (state) => state.books,
        tests: (state) => state.allTests,
        wb: (state) => state.dataset,
        sheetsTotalCount: (state) => state.sheetsTotal,
        sheetActive: (state) => state.activeSheet,
        total: (state) => state.testsTotal,
        testsNames: (state) => state.allTestsNames,
        test: (state) => state.currentTest,
        passwd: (state) => state.password
    },
    actions: {
        loadBook(id: number) {
            this.currentBook = this.books.find(book => book.id === id)
            this.currentBook.link = `${bridge.getAppPath()}/${this.currentBook.link}`
            console.log(this.currentBook)
            router.push({ path: '/viewer' })
        },
        async loadAllBooks() {
            this.books = await ldb.load("books")
        },
        async uploadBook(file: Event) {
            const uploadedFile = await file?.target?.files[0]
            const hashFileName = `${Math.floor(Math.random() * (100000 - 0 + 1)) + 0}_${uploadedFile.name}`

            const book = {
                id: Math.floor(Math.random() * (100000 - 0 + 1)) + 0,
                title: uploadedFile.name.split('.')[0],
                link: `books/${hashFileName}`
            }

            ldb.save("books", book)
            this.books = await ldb.load("books")

            await bridge.saveLocalFile({
                fileName: hashFileName,
                sourcePath: uploadedFile.path
            })
        },
        async deleteBook(id: number, dir: string) {
            await ldb.delete("books", id)
            this.books = await ldb.load("books")

            bridge.deleteLocalFile(dir)
        },
        async loadTestsFromFile(e: Event) {
            if (e) {
                /* Reading a file from event handler */
                this.data = await e?.target?.files[0].arrayBuffer();
                    
                /* data is an ArrayBuffer */
                this.parsedData = read(this.data);
                
                /* DO SOMETHING WITH workbook HERE */
                // this.workbook = utils.sheet_to_json(this.parsedData.Sheets[this.parsedData.SheetNames[0]])
                let sheets: Array<{ idx: number, item: any }> = []

                for (let i = 0; i < this.parsedData.SheetNames.length; i++) {
                    sheets.push({
                        idx: i + 1,
                        item: utils.sheet_to_json(this.parsedData.Sheets[this.parsedData.SheetNames[i]])
                    })
                }

                const replacements = {
                    '№': 'num',
                    'Вопросы': 'question',
                    'Вопрос': 'question',
                    'Варианты ответов': 'var1',
                    'Ответы': 'var1',
                    '__EMPTY': 'var2',
                    '__EMPTY_1': 'var3',
                    '__EMPTY_2': 'var4',
                    '__EMPTY_3': 'var5',
                    '__EMPTY_4': 'var6',
                    '__EMPTY_5': 'var7',
                    '__EMPTY_6': 'var8',
                    '__EMPTY_7': 'var9',
                    '__EMPTY_8': 'var10',
                    '__EMPTY_9': 'var11',
                    '__EMPTY_10': 'var12',
                    '__EMPTY_11': 'var13',
                    '__EMPTY_12': 'var14',
                    '__EMPTY_13': 'var15',
                    '__EMPTY_14': 'var16',
                    '__EMPTY_15': 'var17',
                    '__EMPTY_16': 'var18',
                    '__EMPTY_17': 'var19',
                }

                const ds = sheets.map((sheet) => {
                    return {
                        idx: sheet.idx,
                        item: sheet.item.map((question) => {
                            const keyValues = Object.keys(question).map(key => {
                                const newKey = replacements[key] || key;
                                return { [newKey]: question[key] };
                              });
    
                            const newObject = Object.assign({}, ...keyValues);
    
                            return newObject;
                        })
                    }
                })

                const st = sheets.length

                
                this.dataset = ds
                this.sheetsTotal = st
            }
        },
        chooseSheet(num: number) {
            const currentDataset = this.dataset[num].item
            console.log(currentDataset)
            const newCurr = currentDataset.map((q) => {
                const variants = Object.fromEntries(
                    Object.entries(q)
                    .filter(
                        ([key, value]) => key.includes('var') && !isNaN(value as number)));
                    
                Object.defineProperty(q, 'variants', {
                    value: Object.values(variants),
                    writable: true
                })

                return q
            })

            this.activeSheet = newCurr
        },
    }
})