import { PapayaConfig } from "..";

export default class Config extends PapayaConfig {
    constructor() {
        super();
        this.configuration = {
            dynamicPublics: false,
        }
    }
}