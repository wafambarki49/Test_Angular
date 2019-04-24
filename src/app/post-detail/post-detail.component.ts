import { Component, OnInit, ViewChild } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  @ViewChild(ModalComponent) modalHtml: ModalComponent;
  isShowComments: boolean = false;
  id: number;

  postDetail = {
    title: '',
    body: ''
  };
  postComments: Array<any> = [];

  constructor(private postsService: PostsService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    
    forkJoin( 
      this.postsService.getPostDetail(this.id),
      this.postsService.getComments(this.id)
    ).subscribe( 
      ([post,comments]) => {
        this.postDetail = post;
        this.postComments = comments;
      },
      ([err1,err2]) => {
        console.log(err1);
        console.log(err2);
      }
      );
  } 

  openModal() {
    this.modalHtml.open();
  }

  addComment(comment){
    const updatedComment = {...comment,postId: this.id};
    this.postsService.addComment(comment,this.id).subscribe(
    (response) => {
      const newComment = response;
      this.postComments = [...this.postComments,newComment];
    },
  (error) => {
    console.log(error);
  });
  }

  showComments() {
    this.isShowComments = !this.isShowComments;
  }

}
