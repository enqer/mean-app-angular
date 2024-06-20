import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { EditPost, Post } from '../types';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'http://localhost:3001';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.url + '/api/posts');
  }

  getById(id: string) {
    return this.http.get(this.url + '/api/posts/' + id);
  }

  createPost(post: Post){
    return this.http.post(this.url + '/api/posts', post)
  }

  editPost(post: EditPost){
    return this.http.put(this.url + '/api/posts', post)
  }

}

