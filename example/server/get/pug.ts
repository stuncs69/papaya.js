import { PapayaRoute } from "../../..";
import { render, extractGetParameters } from "../../../src/util";

export default class GetForm extends PapayaRoute {
    path = "/pug";
    callback = (request: Request) => {
        return new Promise((resolve) => {
            let getParams = extractGetParameters(request);
            console.log(getParams);
            render("test.pug", getParams).then((html) => {
                resolve(html)
            })
        })
    };
}