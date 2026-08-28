import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_ENDPOINTS } from './api-endpoints';

const BASE64_ENABLED_GLOBALLY = false;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  // Encode / Decode helpers

  private encode(payload: any): { data: string } {
    const json = JSON.stringify(payload);
    const base64 = btoa(unescape(encodeURIComponent(json)));
    return { data: base64 };
  }

  private decode<T = any>(response: any): T {
    try {
      if (typeof response === 'string') {
        const json = decodeURIComponent(escape(atob(response)));
        return JSON.parse(json) as T;
      }

      if (response && typeof response.data === 'string') {
        const json = decodeURIComponent(escape(atob(response.data)));
        return JSON.parse(json) as T;
      }
    } catch {
      console.warn(
        '[ApiService] decode: failed to parse base64 response',
        response,
      );
    }

    return response as T;
  }

  private shouldEncode(useBase64?: boolean): boolean {
    return useBase64 !== undefined ? useBase64 : BASE64_ENABLED_GLOBALLY;
  }

  private withDecode<T>(
    obs: Observable<any>,
    useBase64: boolean,
  ): Observable<T> {
    return useBase64 ? obs.pipe(map((res) => this.decode<T>(res))) : obs;
  }

  // API methods

  getAllList(
    payload: any,
    module: keyof typeof API_ENDPOINTS,
    skipLoader = false,
    useBase64?: boolean,
  ): Observable<any> {
    const encode = this.shouldEncode(useBase64);
    const context = new HttpContext();

    const body = encode ? this.encode(payload) : payload;
    return this.withDecode(
      this.http.post(API_ENDPOINTS[module], body, { context }),
      encode,
    );
  }

  createData(
    postData: any,
    module: keyof typeof API_ENDPOINTS,
    useBase64?: boolean,
  ): Observable<any> {
    const encode = this.shouldEncode(useBase64);
    const body = encode ? this.encode(postData) : postData;
    return this.withDecode(this.http.post(API_ENDPOINTS[module], body), encode);
  }

  updateData(
    id: number,
    postData: any,
    module: keyof typeof API_ENDPOINTS,
    useBase64?: boolean,
  ): Observable<any> {
    const encode = this.shouldEncode(useBase64);
    const body = encode ? this.encode(postData) : postData;
    return this.withDecode(
      this.http.put(API_ENDPOINTS[module] + `?id=${id}`, body),
      encode,
    );
  }

  deleteData(
    id: number,
    module: keyof typeof API_ENDPOINTS,
    useBase64?: boolean,
  ): Observable<any> {
    const encode = this.shouldEncode(useBase64);
    return this.withDecode(
      this.http.delete(API_ENDPOINTS[module] + `?id=${id}`),
      encode,
    );
  }

  getDataByID(
    id: number,
    module: keyof typeof API_ENDPOINTS,
    useBase64?: boolean,
  ): Observable<any> {
    const encode = this.shouldEncode(useBase64);
    return this.withDecode(
      this.http.get(API_ENDPOINTS[module] + `?id=${id}`),
      encode,
    );
  }

  extractData(
    id: number,
    postData: any,
    module: keyof typeof API_ENDPOINTS,
    useBase64?: boolean,
  ): Observable<any> {
    const encode = this.shouldEncode(useBase64);
    const body = encode ? this.encode(postData) : postData;
    return this.withDecode(
      this.http.put(API_ENDPOINTS[module] + `?id=${id}`, body),
      encode,
    );
  }

  getDataByFiscalYear(
    fiscalYear: string,
    module: keyof typeof API_ENDPOINTS,
    useBase64?: boolean,
  ): Observable<any> {
    const encode = this.shouldEncode(useBase64);
    return this.withDecode(
      this.http.get(API_ENDPOINTS[module] + `?fiscal_year=${fiscalYear}`),
      encode,
    );
  }

  getDataByIDAndOtherId(
    id: number,
    other_id: number,
    module: keyof typeof API_ENDPOINTS,
    useBase64?: boolean,
  ): Observable<any> {
    const encode = this.shouldEncode(useBase64);
    return this.withDecode(
      this.http.get(API_ENDPOINTS[module] + `?id=${id}&other_id=${other_id}`),
      encode,
    );
  }

  getDataByIDType(
    id: number,
    type: any,
    module: keyof typeof API_ENDPOINTS,
    useBase64?: boolean,
  ): Observable<any> {
    const encode = this.shouldEncode(useBase64);
    return this.withDecode(
      this.http.get(API_ENDPOINTS[module] + `?id=${id}&type=${type}`),
      encode,
    );
  }

  postWithQuery(
    queryParams: string,
    module: keyof typeof API_ENDPOINTS,
    useBase64?: boolean,
  ): Observable<any> {
    const encode = this.shouldEncode(useBase64);
    return this.withDecode(
      this.http.post(API_ENDPOINTS[module] + '?' + queryParams, {}),
      encode,
    );
  }

  viewNotification(
    id: number,
    role: string,
    module: keyof typeof API_ENDPOINTS,
    useBase64?: boolean,
  ): Observable<any> {
    const encode = this.shouldEncode(useBase64);
    return this.withDecode(
      this.http.get(`${API_ENDPOINTS[module]}?id=${id}&role_type=${role}`),
      encode,
    );
  }

  //   getData(
  //     module: keyof typeof API_ENDPOINTS,
  //     useBase64?: boolean,
  //   ): Observable<any> {
  //     const encode = this.shouldEncode(useBase64);
  //     return this.withDecode(this.http.get(API_ENDPOINTS[module]), encode);
  //   }

  //   getRoleRoutes(roleId: number, useBase64?: boolean): Observable<any> {
  //     const encode = this.shouldEncode(useBase64);
  //     return this.withDecode(
  //       this.http.get(API_ENDPOINTS.ROLE_LIST_ROUTE + `?role_id=${roleId}`),
  //       encode,
  //     );
  //   }

  getDataWithQuery(
    module: keyof typeof API_ENDPOINTS,
    queryParams: Record<string, string | number>,
    useBase64?: boolean,
  ): Observable<any> {
    const encode = this.shouldEncode(useBase64);
    const query = Object.entries(queryParams)
      .map(([k, v]) => `${k}=${v}`)
      .join('&');
    return this.withDecode(
      this.http.get(`${API_ENDPOINTS[module]}?${query}`),
      encode,
    );
  }
}
