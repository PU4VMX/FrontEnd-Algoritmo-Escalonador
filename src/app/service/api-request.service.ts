import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ApiRequestService {
  private url = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {}

  get(endpoint: string, query?: any, payload?: any) {
    if (query) {
      return this.httpClient
        .get(`${this.url}${endpoint}/?${query}=${payload}`)
        .pipe(retry(2));
    } else {
      return this.httpClient.get(this.url + endpoint).pipe(retry(2));
    }
  }

  post(endpoint: string, body: any) {
    return this.httpClient.post(this.url + endpoint, body).pipe(retry(2));
  }

  put(endpoint: string, body: any) {
    return this.httpClient.put(this.url + endpoint, body).pipe(retry(2));
  }

  patch(endpoint: string, body: any) {
    return this.httpClient.patch(this.url + endpoint, body).pipe(retry(2));
  }

  delete(endpoint: string, object: any) {
    return this.httpClient.delete(this.url + endpoint, object).pipe(retry(2));
  }
}
