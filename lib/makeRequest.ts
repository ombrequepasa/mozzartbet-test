import axios from "axios";

const BASE_URL = "http://172.235.235.11/api";

type RequestParams = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  body?: Record<string, string>;
};

const makeRequest = async ({ method, url, body }: RequestParams) => {
  const config = {
    method,
    url: `${BASE_URL}${url}`,
    headers: {
      "Content-Type": "application/json",
      username: "krivokuca15@gmail.com",
    },
    data: body,
  };

  const maxRetries = 3;
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      lastError = error;
      console.error(
        `Error ${method.toLowerCase()}ing (attempt ${attempt}/${maxRetries}):`,
        error
      );

      if (attempt === maxRetries) {
        break;
      }
    }
  }

  throw lastError;
};

export default makeRequest;
