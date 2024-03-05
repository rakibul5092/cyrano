import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CacheKeys, CacheService } from './cache-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpUtilService {
  private httpHeaders: any = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Accept: 'application/json',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Cache-Control': 'no-cache',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Pragma: 'no-cache',
  };

  /***/
  constructor(private cacheService: CacheService, private http: HttpClient) {
    this.createAuthorizationHeader();
  }

  // -------------------- http --------------------

  /**
   * Http GET action
   *
   * @param path
   * @param params
   */
  public getRequest<T = any>(path, params: any = {}): Observable<T> {
    return this.http.get<any>(path, { headers: new HttpHeaders(this.httpHeaders), params: { ...params } });
  }

  /**
   * Http POST action
   *
   * @param path
   * @param body
   * @param params
   */
  public postRequest<T = any>(path, body, params: any = {}): Observable<T> {
    return this.http.post<T>(path, body, { headers: new HttpHeaders(this.httpHeaders), params: { ...params } });
  }

  /**
   * Http PUT action
   *
   * @param path
   * @param body
   * @param params
   */
  public putResource<T = any>(path, body, params: any = {}): Observable<T> {
    return this.http.put<T>(path, body, { headers: new HttpHeaders(this.httpHeaders), params: { ...params } });
  }

  /**
   * Http DELETE action
   *
   * @param path
   * @param params
   */
  public deleteResource<T = any>(path, params: any = {}): Observable<T> {
    return this.http.delete<T>(path, { headers: new HttpHeaders(this.httpHeaders), params: { ...params } });
  }

  /**
   * Set Auth Token in header
   *
   * @private
   */
  private createAuthorizationHeader(): void {
    const rememberMe = this.cacheService.getLocalStorage(CacheKeys.rememberMe) || false;
    const token = rememberMe ? this.cacheService.getLocalStorage(CacheKeys.token) : this.cacheService.getSessionData(CacheKeys.token);
    if (token) {
      this.httpHeaders.Authorization = token;
    }
  }
}
