import { PapayaConfig } from "..";
export default class Config extends PapayaConfig {
    constructor() {
        super(...arguments);
        this.configuration = {
            dynamicPublics: true,
            allowClasses: true,
            port: 3000,
        };
    }
    logic() {
        console.log("Config loaded!");
    }
}
//# sourceMappingURL=config.papaya.js.map