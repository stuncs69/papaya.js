import { PapayaRoute } from "../../..";
import { renderEJS, extractGetParameters } from "../../../src/util";
export default class GetForm extends PapayaRoute {
    constructor() {
        super(...arguments);
        this.path = "/form";
        this.callback = (request) => {
            return new Promise((resolve) => {
                let getParams = extractGetParameters(request);
                console.log(getParams);
                renderEJS("form.ejs", getParams).then((html) => {
                    resolve(html);
                });
            });
        };
    }
}
//# sourceMappingURL=form.js.map