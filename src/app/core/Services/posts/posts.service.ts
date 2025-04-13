import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private httpClient: HttpClient) {}
  createPost(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/posts`, data);
  }
  getAllPosts(pageNum: number): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/posts?page=${pageNum}`);
  }
  getUserPosts(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/users/${id}/posts`);
  }
  getSinglePost(id: number): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/posts/${id}`);
  }
  updatePost(id: number, data: object): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/posts/${id}`, data);
  }
  deletePost(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/posts/${id}`);
  }
}
