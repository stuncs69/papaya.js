export class DynamicEngine {
    constructor() {}

    matchDynamicPaths(paths: string[], userInput: string): Record<string, Record<string, string>> {
        const results: Record<string, Record<string, string>> = {};

        paths.forEach(path => {
            const regexPattern = new RegExp('^' + path.replace(/\[.*?\]/g, '(\\w+)') + '$');
            const match = userInput.match(regexPattern);
            
            if (match !== null) {
                const dynamicValues: Record<string, string> = {};
                const dynamicParts = path.match(/\[\w+\]/g);
                if (dynamicParts !== null) {
                    dynamicParts.forEach((placeholder, index) => {
                        //@ts-expect-error
                        dynamicValues[placeholder.slice(1, -1)] = match[index + 1];
                    });
                }
                results[path] = dynamicValues;
            }
        });

        return results;
    }
}