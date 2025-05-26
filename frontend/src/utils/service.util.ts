import useSWR from 'swr';
import { BACKEND_API_URL } from '../constants';
import { trim } from './string.util';
import { ResponseDTO } from 'shared/src/dto/generic';
import { unpackBlob } from 'shared/src/utils/pack.util';

export const headers = () => {
  const headers: Record<string, string> = {};
  const token = useToken();

  if (token) {
    headers['Authorization'] = `Bearer ${trim(token, '"')}`;
  }

  return headers;
};

export const buildUrl = (endpoint: string) => {
  return `${BACKEND_API_URL}${endpoint}`;
};

export const useFetchEndpoint = <T>(endpoint: string) =>
  useSWR<T>(buildUrl(endpoint), (url: string) => sendRequest<T>(url, 'GET'));

export const usePostEndpoint = <T, K>(endpoint: string, data: K) =>
  useSWR<T>(buildUrl(endpoint), (url: string) =>
    sendRequestWithBody<K, T>(url, 'POST', data)
  );

export const sendRequest = async <T>(
  url: string,
  method: string
): Promise<T> => {
  const result = await fetch(url, {
    method,
    headers: headers(),
  });

  const body = await result.blob();
  const response = await unpackBlob<ResponseDTO>(body);

  if (response.errors) {
    throw response;
  }

  return response.data as T;
};

export const sendRequestNoBody = async (
  url: string,
  method: string
): Promise<void> => {
  const result = await fetch(url, {
    method,
    headers: headers(),
  });

  const body = await result.blob();
  const response = await unpackBlob<ResponseDTO>(body);

  if (response.errors) {
    throw response;
  }
};

export const sendRequestWithBody = async <T, K>(
  url: string,
  method: string,
  data: T
): Promise<K> => {
  const reqHeaders = headers();
  reqHeaders['Accept'] = 'application/json';
  reqHeaders['Content-Type'] = 'application/json';

  const result = await fetch(url, {
    method,
    headers: reqHeaders,
    body: JSON.stringify(data),
  });

  const body = await result.blob();
  const response = await unpackBlob<ResponseDTO>(body);

  if (response.errors) {
    throw response;
  }

  return response.data as K;
};

export const useToken = (): string | null => localStorage.getItem('token-quiz');
