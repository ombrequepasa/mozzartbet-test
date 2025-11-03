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

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error ${method.toLowerCase()}ing:`, error);
    throw error;
  }
};

export default makeRequest;
