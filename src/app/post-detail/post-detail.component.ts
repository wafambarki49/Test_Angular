import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ModalComponent } from './modal/modal.component';
import { CDDirective } from '../commentDynamic.directive';
import { CommentDataDynamicComponent } from '../CommentDataDynamic.component';
import { CommentsComponent } from './comments/comments.component';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  @ViewChild(ModalComponent) modalHtml: ModalComponent;
  isShowComments: boolean = true;
  id: number;

  postDetail = {
    title: '',
    body: ''
  };
  errorPostDetail: boolean = false;
  loading: boolean = true;
  postComments: Array<any> = [];
  errorComments: boolean = false;
  @ViewChild(CDDirective, { static: true }) adHost: CDDirective;


  constructor(private postsService: PostsService, private route: ActivatedRoute, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.postsService.getPostDetail(this.id).subscribe(
      (response) => {
        this.postDetail = response;
        this.loading = false;
      },
      (error) => {
        error && (this.errorPostDetail = true);
        this.loading = false;
      });

    this.postsService.getComments(this.id).subscribe(
      (response) => {
        this.postComments = response;
      },
      (error) => {
        error && (this.errorComments = true)
      }
    )
  }

  openModal() {
    this.modalHtml.open();
  }

  addComment(comment) {
    const updatedComment = { ...comment, postId: this.id };
    this.postsService.addComment(comment, this.id).subscribe(
      (response) => {
        const newComment = response;
        this.postComments = [...this.postComments, newComment];
        this.isShowComments = true;
        this.showComments();
      },
      (error) => {
        console.log(error);
      });
  }

  showComments() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CommentsComponent);

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    if (this.isShowComments) {
      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<CommentDataDynamicComponent>componentRef.instance).comments = this.postComments;
      (<CommentDataDynamicComponent>componentRef.instance).error = this.errorComments;
      this.isShowComments = false;
    } else {
      this.isShowComments = true;
    }



  }

}
