import { AppErrorHandler } from './common/app-error-handler';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule , } from '@angular/http';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule

  ],
  providers: [
    {provide: ErrorHandler , useClass: AppErrorHandler },
      {provide: String, useValue: 'stringValue'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
