interface Request {
    request: {
        url: string,
        method: string,
        headers: {
            [key: string]: string
        }
    },
}

function extractGetParameters(struct: Request): { [key: string]: string } {
    const url = struct.request.url as string;
    const queryParameters: { [key: string]: string } = {};
    const regex = /[?&]([^=#]+)=([^&#]*)/g;
  
    let match;
    while ((match = regex.exec(url))) {
      const [_, key, value] = match;
      const decodedKey = decodeURIComponent(key);
      const decodedValue = decodeURIComponent(value);
      queryParameters[decodedKey] = decodedValue;
    }
  
    return queryParameters;
}

export { extractGetParameters }