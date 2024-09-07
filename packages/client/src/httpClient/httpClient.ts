import { BASE_URL } from "@/envs";
import HttpError from "./HttpError";

interface Options extends RequestInit {
  user?: {
    authenticated?: boolean;
    token?: string;
  };
}

const createHeadersFromOptions = (options: Options): Headers => {
  const requestHeaders = (options.headers ||
    new Headers({
      Accept: "application/json",
    })) as Headers;
  const hasBody = options && options.body;
  const isContentTypeSet = requestHeaders.has("Content-Type");
  const isGetMethod = !options?.method || options?.method === "GET";
  const isFormData = options?.body instanceof FormData;

  const shouldSetContentType =
    hasBody && !isContentTypeSet && !isGetMethod && !isFormData;
  if (shouldSetContentType) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (options.user && options.user.authenticated && options.user.token) {
    requestHeaders.set("Authorization", options.user.token);
  }

  return requestHeaders;
};

export const httpClient = async (
  url: string,
  options: Options = {},
  baseUrl: string = BASE_URL
) => {
  const fullUrl = `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  const requestHeaders = createHeadersFromOptions(options);
  const response = await fetch(fullUrl, {
    ...options,
    headers: requestHeaders,
  });
  const text = await response.text();
  const { status, statusText, headers, body } = {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    body: text,
  };
  let json;
  try {
    json = JSON.parse(body);
  } catch {
    /* empty */
  }
  if (status < 200 || status >= 300) {
    return Promise.reject(
      new HttpError((json && json.message) || statusText, status, json)
    );
  }
  return await Promise.resolve({ status, headers, body, json });
};
