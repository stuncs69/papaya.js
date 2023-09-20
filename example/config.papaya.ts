import { PapayaConfig } from "..";

export default class Config extends PapayaConfig {
    constructor() {
        super();
        this.configuration = {
            dynamicPublics: false,
            port: 3000,
            allowClasses: true,
        }
    }
}