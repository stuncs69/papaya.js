import { PapayaRoute } from "../../..";
import { render, extractGetParameters } from "../../../src/util";

export default class GetForm extends PapayaRoute {
    path = "/dynamic/[param]/engine";
    callback = (request: Request, _r: any, _m: any, query: any) => {
        return new Promise((resolve) => {
            console.log(query)
            render("test.pug", query).then((html) => {
                resolve(html)
            })
        })
    };
}