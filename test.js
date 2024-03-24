function matchDynamicPaths(paths, userInput) {
    const results = {};

    // Iterate through each path
    paths.forEach(path => {
        // Generate regex pattern dynamically
        const regexPattern = new RegExp('^' + path.replace(/\[.*?\]/g, '(\\w+)') + '$');
        const match = userInput.match(regexPattern);
        
        // If a match is found, extract dynamic values
        if (match !== null) {
            const dynamicValues = {};
            const dynamicParts = path.match(/\[\w+\]/g);
            if (dynamicParts !== null) {
                dynamicParts.forEach((placeholder, index) => {
                    dynamicValues[placeholder.slice(1, -1)] = match[index + 1];
                });
            }
            results[path] = dynamicValues;
        }
    });

    return results;
}

// Example array of paths
const paths = [
    "/dynamic/[query]/engine"
];

// Example user input
const userInput = "/dynamic/ok/engine";

// Test the function
const matchedValues = matchDynamicPaths(paths, userInput);
console.log(matchedValues);
