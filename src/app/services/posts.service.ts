import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable,of } from 'rxjs';
import { map,filter,catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  POSTS_API_URL = 'https://jsonplaceholder.typicode.com/posts';
  COMMENTS_API_URL = 'https://jsonplaceholder.typicode.com/comments';
  constructor(private http: Http) { }

  getPosts() {
    return this.http.get(this.POSTS_API_URL).pipe(

      map((response: Response) => {
        return response.json();
      }),
      
      catchError( error => of(`Something Went Wrong:${error}`) )
    );
  }

  getPostDetail(id) {
    return this.http.get(this.POSTS_API_URL + `/${id}`).pipe(
      map( (response: Response) => {
        return response.json();
      }),
      catchError( error => of(`Something Went Wrong:${error}`))
    )
  }

  addComment(comment, id) {
    return this.http.post(this.POSTS_API_URL + `/${id}/comments`,comment).pipe(
      map( (response: Response) => {
        return response.json();
      }),
      catchError( error => of(`Something Went Wrong:${error}`))
    )
  }

  getComments(id) {
    return this.http.get(this.COMMENTS_API_URL+ `?postId=${id}`).pipe(
      map( (response: Response) => {
           return response.json();
         }
      ),
      catchError( error => of(`Something Went Wrong:${error}`))
    )
  }
}
