import { PapayaConfig } from "..";
import { Settings } from "../src/interfaces";

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