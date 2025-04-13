import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private httpClient: HttpClient) {}
  createComment(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/comments`, data);
  }
  getPostComments(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/posts/${id}/comments`);
  }
  updateComment(id: string, data: object): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/comments/${id}`, data);
  }
  deleteComment(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/comments/${id}`);
  }
}
