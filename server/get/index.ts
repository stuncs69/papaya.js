import { extractGetParameters } from "../../src/util"

export default {
    path: "/",
    callback: (req: any) => {
        return new Promise((resolve, reject) => {
            resolve(JSON.stringify(req))
        })
    },
}