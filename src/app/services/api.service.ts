import { Injectable } from '@angular/core';
import { SuccessResponse } from '../types/success-response';
import { FailedResponse } from '../types/failed-response';

@Injectable()
export class ApiService {
  constructor() {}
  private extractErrorMessage(error: unknown) {
    if (error instanceof Error) {
      return error.message;
    }
    if (error && typeof error === 'object' && 'message' in error) {
      return String(error.message);
    }
    if (typeof error === 'string') {
      return error;
    }

    return 'Something went wrong.';
  }

  private async call<T>(
    url: string,
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    body?: T
  ): Promise<SuccessResponse<T> | FailedResponse> {
    try {
      const options: RequestInit = {
        signal: AbortSignal.timeout(15000),
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      };

      if ((body && method !== 'GET') || method !== 'DELETE') {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        return {
          error: {
            message: `Erreur : ${response.statusText}`,
            code: response.status,
          },
          data: null,
        };
      }

      const data: T = await response.json();
      return { error: null, code: response.status, data };
    } catch (error: unknown) {
      return {
        error: {
          message: this.extractErrorMessage(error),
          code: 0,
        },
        data: null,
      };
    }
  }

  async get<T>(url: string) {
    return this.call<T>(url, 'GET');
  }

  async post<T>(url: string, query: T) {
    return this.call<T>(url, 'POST', query);
  }

  async patch<T>(url: string, query: T) {
    return this.call<T>(url, 'PATCH', query);
  }

  async delete<T>(url: string, query: T) {
    return this.call<T>(url, 'DELETE');
  }
}
