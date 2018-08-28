import { BadRequestError } from './../common/bad-request-error';
import { AppError } from './../common/app-error';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { NotFoundError } from '../common/not-found-error';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];

  constructor(private service: PostService) {}


  createPost(input: HTMLInputElement) {
    const post = {title: input.value};
    input.value = '';

    this.posts.splice(0, 0 , post);

    this.service.create(post)
    .subscribe(
      response => {
      post['id'] = response.json().id;
    }, (error: AppError) => {
      this.posts.splice(0, 1);

      if (error instanceof BadRequestError) {
        // this.form.setError(error.orignalError);
        alert('bad request');
      } else { throw error; }
     });
  }

  updatePost(post) {
    this.service.update(post)
    .subscribe(
      response => {
      console.log(response.json());
    });
  }

  deletePost(post) {
    const index = this.posts.indexOf(post);
    this.posts.splice(index , 1);

    this.service.delete(post.id)
    .subscribe(
      response => {
      console.log(response.json());
    }, (error: AppError) => {
      if (error instanceof NotFoundError) {
        // this.form.setError(error.json());
        this.posts.splice(index , 0 , post);

        alert('This post has already been delete');
      } else {
      throw error;
      }
     });
  }

  ngOnInit() {
    this.service.getAll()
    .subscribe(
        response => {
        console.log(response.json());
        this.posts = response.json();
    });
}
}
