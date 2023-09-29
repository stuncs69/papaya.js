import { PapayaRoute } from "../../..";
import { getPostBody } from "../../../src/util";
import https from "https";

export default class ApiRoute extends PapayaRoute {
    path = "/api";
    callback = (req: any) => {
        return new Promise((resolve) => {
            getPostBody(req).then((body: any) => {
                if (body.data == "hi") {
                    resolve("hi");
                } else {
                    resolve("bye");
                }
            });
        })
    };
}