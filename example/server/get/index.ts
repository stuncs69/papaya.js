import {  renderPublic, renderEJS, extractGetParameters } from "../../../src/util"
import { PapayaRoute } from "../../.."

export default class GetIndex extends PapayaRoute {
    path = "/";
    callback = () => {
        return new Promise((resolve) => {
            resolve(renderPublic("index.html"));
        })
    };
}