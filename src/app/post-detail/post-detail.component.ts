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
  
  isModalOpen: boolean = false;
  isShowComments: boolean = false;
  id: number;

  name:string = '';
  email:string = '';
  body:string = '';
  
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
    this.isModalOpen = !this.isModalOpen;
  }

  addComment(){
    const comment = {
      name: this.name,
      email: this.email,
      body:  this.body,
      postId: this.id
  }
  this.postsService.addComment(comment,this.id).subscribe(
    (response) => {
      const newComment = response;
      this.postComments = [...this.postComments,newComment];
    },
  (error) => {
    console.log(error);
  }
    );
  }

  showComments() {
    this.isShowComments = !this.isShowComments;
  }


  public modalOptions: Materialize.ModalOptions = {
    dismissible: false, 
    opacity: .5, 
    inDuration: 300, 
    outDuration: 200, 
    startingTop: '100%', 
    endingTop: '10%', 
    ready: (modal, trigger) => { 
      console.log(modal, trigger);
    },
    complete: () => {console.log("closed")} // Callback for Modal close
  };

}
