import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsHomeComponent } from '../posts-home/posts-home.component';
import { PostDetailComponent } from '../post-detail/post-detail.component';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';


const routes: Routes = [
  { path:'posts', component: PostsHomeComponent },
  { path: 'posts/:id', component: PostDetailComponent},
  { path: '', redirectTo: '/posts', pathMatch: 'full'},
  { path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
