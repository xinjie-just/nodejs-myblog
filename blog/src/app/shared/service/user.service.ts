import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequestParams } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(params: LoginRequestParams): Observable<any> {
    return this.http.post(`/api/user/login`, params);
  }
}
