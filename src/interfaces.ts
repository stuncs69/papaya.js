interface Settings {
    dynamicPublics: boolean,
    allowClasses?: boolean,
    port: number,
}

interface Connection {
    IP: string,
    ID: string,
}


interface Request {
    request: {
        url: string,
        method: string,
        headers: {
            [key: string]: string
        }
    },
}

export { Settings, Connection, Request }