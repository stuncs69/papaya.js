import {  getPublicFileContents } from "../../../src/util"
import { PapayaRoute } from "../../.."

export default class GetIndex extends PapayaRoute {
    path = "/";
    callback = () => {
        return new Promise((resolve) => {
            resolve(getPublicFileContents("index.html"));
        })
    };
}