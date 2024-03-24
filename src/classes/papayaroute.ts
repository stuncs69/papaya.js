export class PapayaRoute {
    path: string = "";
    callback: (req: any, res: any, middlewareData: any, dynamicQuery: any) => Promise<any> = async (req, res) => {console.log("No callback!")};
}