import { PapayaConfig } from "papaya.js";

export default class Config extends PapayaConfig {
    constructor() {
        super();
        this.configuration = {
            dynamicPublics: false,
        }
    }
}