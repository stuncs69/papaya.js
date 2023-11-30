import { PapayaRoute } from "../../..";
import { getPostBody } from "../../../src/util";
export default class ApiRoute extends PapayaRoute {
    constructor() {
        super(...arguments);
        this.path = "/api";
        this.callback = (req) => {
            return new Promise((resolve) => {
                getPostBody(req).then((body) => {
                    if (body.data == "hi") {
                        resolve("hi");
                    }
                    else {
                        resolve("bye");
                    }
                });
            });
        };
    }
}
//# sourceMappingURL=api.js.map