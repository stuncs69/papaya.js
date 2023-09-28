import { PapayaRoute } from "../../..";
import { renderEJS, extractGetParameters } from "../../../src/util";

export default class GetForm extends PapayaRoute {
    path = "/form";
    callback = (request: Request) => {
        return new Promise((resolve) => {
            let getParams = extractGetParameters(request);
            console.log(getParams);
            renderEJS("form.ejs", getParams).then((html) => {
                resolve(html);
            })
        })
    };
}