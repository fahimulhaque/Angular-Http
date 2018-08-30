import { AppErrorHandler } from './common/app-error-handler';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Component } from '@angular/core';
import { HttpModule , } from '@angular/http';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { GithubFollowersComponent } from './github-followers/github-followers.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule , Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/followers',
    pathMatch: 'full'
  },
  { path: 'followers',
    component: GithubFollowersComponent
  },
  { path: 'posts',
    component: PostsComponent
  },
  { path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    GithubFollowersComponent,
    NavbarComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],

  providers: [
    {provide: ErrorHandler , useClass: AppErrorHandler },
      {provide: String, useValue: 'stringValue'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
