import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';
import { Response, ErrorResponse } from '../types/response-types';

/**
 * Query.
 */
export type Query<R extends Response> = {
  status: Status;
  response: R;
  errorResponse: ErrorResponse;
  get: (url: string, config?: AxiosRequestConfig) => void;
  post: (url: string, body?: unknown, config?: AxiosRequestConfig) =>void;
  put: (url: string, body?: unknown, config?: AxiosRequestConfig) => void;
  patch: (url: string, body?: unknown, config?: AxiosRequestConfig) => void;
  delete: (url: string, config?: AxiosRequestConfig) => void;
}

/**
 * Status enumeration.
 */
export enum Status {
  INIT = 0,
  IN_PROGRESS = 1,
  SUCCESS = 2,
  ERROR = 3
}

/**
 * Query hook.
 * 
 * This hook can make API calls and returns the response data.
 * 
 * @returns Query
 */
export const useQuery = <R extends Response>(): Query<R> => {
  const [status, setStatus] = useState<Status>(Status.INIT);
  const [response, setResponse] = useState<R>(null);
  const [errorResponse, setErrorResponse] = useState<ErrorResponse>(null);

  const get = (url: string, config?: AxiosRequestConfig) => {
    setStatus(Status.IN_PROGRESS);
    axios.get<R>(url, config).then(handleResponse).catch(handleError);
  }

  const post = (url: string, body: unknown, config?: AxiosRequestConfig) => {
    setStatus(Status.IN_PROGRESS);
    axios.post<R>(url, body, config).then(handleResponse).catch(handleError)
  }

  const put = (url: string, body: unknown, config?: AxiosRequestConfig) => {
    setStatus(Status.IN_PROGRESS);
    axios.put<R>(url, body, config).then(handleResponse).catch(handleError)
  }

  const patch = (url: string, body: unknown, config?: AxiosRequestConfig) => {
    setStatus(Status.IN_PROGRESS);
    axios.patch<R>(url, body, config).then(handleResponse).catch(handleError)
  }
  
  const del = (url: string, config?: AxiosRequestConfig) => {
    setStatus(Status.IN_PROGRESS);
    axios.delete<R>(url, config).then(handleResponse).catch(handleError)
  }

  function handleResponse(res: AxiosResponse<R>) {
    setResponse(res.data);
    setStatus(Status.SUCCESS);
  }

  function handleError(err: AxiosError<ErrorResponse>) {
    if (err.message === 'Network Error') {
      setErrorResponse({ errors: [{ error: 'access_denied', error_description: 'Could not connect to server' }] } as ErrorResponse);
    } else {
      setErrorResponse(err.response.data);
    }
    setStatus(Status.ERROR);
  }

  return { status, response, errorResponse, get, post, put, patch, delete: del };
}
