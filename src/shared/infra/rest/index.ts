import APIError, { APIErrorData } from '../../errors/api-error';

enum Methods {
  POST = 'POST',
  PUT = 'PUT',
  GET = 'GET',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export async function makeRequest<T>(
  url: string,
  authToken: string,
  options?: RequestInit
): Promise<T> {
  const token = authToken;

  const { method = Methods.GET, body, headers } = options ?? {};

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      body,
      headers: {
        ...defaultHeaders,
        Authorization: token,
      },
    });
  } catch (requestError) {
    throw requestError as Error;
  }

  if (!response.ok) {
    const errorResult = await parseErrorResponseToJson(response);
    throw new APIError(errorResult);
  }

  return parseResponseToJson<T>(response);
}

async function parseErrorResponseToJson(
  response: Response
): Promise<APIErrorData> {
  return {
    statusCode: response.status,
    status: response.statusText,
    message: await response.text(),
  };
}

async function parseResponseToJson<T>(response: Response) {
  if (response.headers.get('Content-Length') === '0') {
    return undefined as unknown as T;
  }

  try {
    return (await response.json()) as T;
  } catch (parseToJsonError) {
    throw new Error('Failed to parse json response');
  }
}

export async function getRequest<T>(
  url: string,
  authToken: string,
  options?: RequestInit
): Promise<T> {
  return makeRequest<T>(url, authToken, {
    ...options,
    method: Methods.GET,
  });
}

export async function postRequest<T>(
  url: string,
  authToken: string,
  options?: RequestInit
): Promise<T> {
  return makeRequest<T>(url, authToken, {
    ...options,
    method: Methods.POST,
  });
}

export async function putRequest<T>(
  url: string,
  authToken: string,
  options?: RequestInit
): Promise<T> {
  return makeRequest<T>(url, authToken, {
    ...options,
    method: Methods.PUT,
  });
}

export async function patchRequest<T>(
  url: string,
  authToken: string,
  options?: RequestInit
): Promise<T> {
  return makeRequest<T>(url, authToken, {
    ...options,
    method: Methods.PATCH,
  });
}

export async function deleteRequest<T>(
  url: string,
  authToken: string,
  options?: RequestInit
): Promise<T> {
  return makeRequest<T>(url, authToken, {
    ...options,
    method: Methods.DELETE,
  });
}
