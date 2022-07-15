import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private MAX_RETRIES = 0;
  private TIME_OUT = 40000;
  readonly ROOT_URL = environment.URL_API;

  constructor(
    private httpClient: HttpClient
  ) {}

  post(endpoint: string, data: {}, params?: {},): Observable<any> {
    return this.httpClient.post(this.ROOT_URL + endpoint, data, { params }).pipe(
      retry(this.MAX_RETRIES)
    );
  }

  get(endpoint: string, guarded?: boolean, params?: {}, headers?: {}, responseType?: any): Observable<any> {
    if (!responseType) {
      responseType = 'json';
    }
    return this.httpClient.get(this.ROOT_URL + endpoint, {params, headers, responseType}).pipe(
      retry(this.MAX_RETRIES),catchError(error => of(`Request timed out after`))
    );
  }

  put(endpoint: string, data: {}, guarded?: boolean) {
    return this.httpClient.put(this.ROOT_URL + endpoint, data).pipe(
      retry(this.MAX_RETRIES)
    );
  }

  patch(endpoint: string, data: {}, guarded?: boolean) {
    return this.httpClient.patch(this.ROOT_URL + endpoint, data).pipe(
      retry(this.MAX_RETRIES)
    );
  }

  delete(endpoint: string, options?: {}) {
    return this.httpClient.delete(this.ROOT_URL + endpoint).pipe(
      retry(this.MAX_RETRIES)
    );
  }
}
