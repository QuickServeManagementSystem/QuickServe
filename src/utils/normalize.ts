import camelcaseKeys from 'camelcase-keys';

function isHtml(str: string): boolean {
  return /<\/?[a-zA-Z][\s\S]*>/gm.test(str);
}

export const parseXmlToJson = (xml: string) => {
  const json: any = {};
  const OPEN_TAG_INDEX = 1;
  const CLOSE_TAG_INDEX = 3;
  const CONTENT_INDEX = 2;
  for (const res of xml.matchAll(
    /(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm,
  )) {
    const key = res[OPEN_TAG_INDEX] || res[CLOSE_TAG_INDEX];
    const value = res[CONTENT_INDEX] && parseXmlToJson(res[CONTENT_INDEX]);
    json[key] =
      (value && Object.keys(value).length ? value : res[CONTENT_INDEX]) || null;
  }
  return json;
};

export const normalizeJsonApiIfNeed = (data: any): any => {
  let newData: any = {message: data};
  // detect xml file
  if (typeof data === 'string') {
    try {
      newData = JSON.parse(data);
    } catch (e) {
      // console.log('Error parsing JSON', e);
      if (isHtml(data)) {
        newData = parseXmlToJson(data);
      }
    }
    return camelcaseKeys(newData, {deep: true});
  }

  if (Array.isArray(data)) {
    newData = [...data];
  }

  return camelcaseKeys(data, {deep: true});
};

export const formatRequest = (config?: any) => {
  // Define color codes
  const colors = {
    url: '\x1b[36m', // Cyan
    braces: '\x1b[32m', // Green
    statusCodeGreen: '\x1b[32m', // Green
    statusCodeRed: '\x1b[31m', // Red
  };

  // Extract parts of the request config
  const method = config?.method ? config.method.toUpperCase() : '';
  const url = (config?.baseURL ?? '') + (config?.url ?? '');
  const dataOrParams = ['post', 'POST'].includes(config?.method ?? '')
    ? config?.data
    : config?.params;
  const statusCode = config?.statusCode ?? ''; // Extract statusCode from config

  // Determine status code color
  const statusCodeColor =
    statusCode === 200 ? colors.statusCodeGreen : colors.statusCodeRed;

  // Format the request with colors
  const formattedRequest = [
    `\x1b[1mREQUEST: ${statusCodeColor}${method}\x1b[0m ${colors.url}${url}\x1b[0m`,
    `\x1b[1mSTATUS CODE: ${statusCodeColor}${statusCode}\x1b[0m`,
  ];

  // Add formatted data or params if available
  if (dataOrParams) {
    formattedRequest.push('DATA OR PARAMS:');
    const dataOrParamsStr =
      typeof dataOrParams === 'object'
        ? JSON.stringify(normalizeJsonApiIfNeed(dataOrParams), null, 2)
        : dataOrParams;
    formattedRequest.push(dataOrParamsStr);
  }

  // Join formatted parts with newline character
  return formattedRequest.join('\n');
};
