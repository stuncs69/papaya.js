import { Settings } from "src/interfaces";

/**
 * The class used to configure your Papaya.js server.
 * ```ts
import { PapayaConfig, Settings } from "papaya.js";

export default class Config extends PapayaConfig {
    configuration: Settings = {
        dynamicPublics: true,
        allowClasses: true,
        port: 3000,
    }
    logic() {
        console.log("Config loaded!")
    }
}
 * ```
 */
export class PapayaConfig {
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