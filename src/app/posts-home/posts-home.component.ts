import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts-home',
  templateUrl: './posts-home.component.html',
  styleUrls: ['./posts-home.component.css']
})
export class PostsHomeComponent implements OnInit {

  posts:Array<any> = [];

  constructor(private postService: PostsService) { }

  ngOnInit() {
    this.postService.getPosts().subscribe( 
      (response) => {
      this.posts = response;
      },
    (error) => {
      console.log(error);
    })
  }

}
