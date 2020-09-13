import {
  DeleteBlogRequestParams,
  SearchBlogRequestParams,
  AddUpdateBlogRequestParams,
} from './../interface/blog.d';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  getBlogList(params?: SearchBlogRequestParams): Observable<any> {
    return this.http.get(
      `/api/blog/list?keyword=${params.title}&author=${params.author}`
    );
  }

  deleteBlog(params: DeleteBlogRequestParams): Observable<any> {
    return this.http.post(`/api/blog/delete?id=${params.id}`, {});
  }

  getBlogInfo(id: number): Observable<any> {
    return this.http.get(`/api/blog/detail?id=${id}`);
  }

  createBlog(params: AddUpdateBlogRequestParams): Observable<any> {
    return this.http.post(`/api/blog/new`, params);
  }

  updateBlog(id: number, params: AddUpdateBlogRequestParams): Observable<any> {
    return this.http.post(`/api/blog/update?id=${id}`, params);
  }
}
