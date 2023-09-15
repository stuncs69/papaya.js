import { getPublicFileContents } from "../../src/util"

export default {
    path: "/",
    callback: (req: any, res: any, middlewareData: any) => {
        return new Promise((resolve, reject) => {
            resolve(JSON.stringify(middlewareData))
        })
    },
}