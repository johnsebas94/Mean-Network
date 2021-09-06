import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private env: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.env = environment.APP_URL;
  }
  savePost(post: any) {
    return this._http.post<any>(this.env + 'post/savePost', post);
  }
  listPost() {
    return this._http.get<any>(this.env + 'post/listPost');
  }
  updatePost(post: any){
    return this._http.put<any>(this.env + "post/updatePost", post)
  }

  deletePost(post: any){
    return this._http.delete<any>(this.env + "post/deletePost/" + post._id)
  }
}
