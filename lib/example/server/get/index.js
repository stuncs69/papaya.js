import { renderPublic } from "../../../src/util";
import { PapayaRoute } from "../../..";
export default class GetIndex extends PapayaRoute {
    constructor() {
        super(...arguments);
        this.path = "/";
        this.callback = () => {
            return new Promise((resolve) => {
                resolve(renderPublic("index.html"));
            });
        };
    }
}
//# sourceMappingURL=index.js.map