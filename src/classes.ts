import { Settings } from "./interfaces";

class PapayaConfig {
    configuration: Settings = {
        dynamicPublics: false,
        allowClasses: false,
        port: 8080,
    };

    constructor() {}

    config(configuration: Settings) {
        this.configuration = configuration;
    }

    logic() {
        // no logic applied
    }

    getConfiguration() {
        return this.configuration;
    }
}

class PapayaRoute {
    path: string = "";
    callback: (req: any, res: any) => Promise<any> = async (req, res) => {console.log("No callback!")};
}

export { PapayaConfig, PapayaRoute }