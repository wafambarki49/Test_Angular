import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  id: number;

  constructor(private postsService: PostsService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    
    forkJoin( 
      this.postsService.getPostDetail(this.id),
      this.postsService.getComments(this.id)
    ).subscribe( 
      ([post,comments]) => {
        console.log("responseOne",post);
        console.log("responseTwo",comments);
    },
      ([err1,err2]) => {
        console.log(err1);
        console.log(err2);
      }
      );
  }

  onAddComment(){
    const comment = {
      name: "nameComment",
      email: "emailComment",
      body:   "bodyComment",
      postId: this.id
  }
  this.postsService.addComment(comment,this.id).subscribe(
    (response) => {
      console.log(response);
    },
  (error) => {
    console.log(error);
  }
    );
  }




}
