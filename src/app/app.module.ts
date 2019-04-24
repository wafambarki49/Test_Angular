import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PostsHomeComponent } from './posts-home/posts-home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MzCollectionModule, MzCardModule, MzIconModule, MzIconMdiModule, MzModalModule, MzButtonModule,MzInputModule } from 'ngx-materialize';
import { CommentsComponent } from './post-detail/comments/comments.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './post-detail/modal/modal.component';





@NgModule({
  declarations: [
    AppComponent,
    PostsHomeComponent,
    PostDetailComponent,
    NotFoundPageComponent,
    CommentsComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    MzCollectionModule,
    MzCardModule,
    MzIconModule,
    MzIconMdiModule,
    MzModalModule,
    MzButtonModule,
    MzInputModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
