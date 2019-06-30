import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { CommentDataDynamicComponent } from 'src/app/CommentDataDynamic.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit,CommentDataDynamicComponent {
  comments: any[];
  error: boolean;

  

  constructor() { }

  ngOnInit() {
    console.log(this.comments);
  }

}
