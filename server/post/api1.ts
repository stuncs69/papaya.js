export default {
    path: "/api/wappie",
    callback: (postreq: any) => {
        return new Promise((resolve, reject) => {
            resolve(JSON.stringify(postreq))
        })
    },
}