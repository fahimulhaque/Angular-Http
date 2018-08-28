import { BadRequestError } from './../common/bad-request-error';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { Http } from '@angular/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';
export class DataService {
  constructor(private url: string , private http: Http) {
   }

  getAll() {
    return this.http.get(this.url).pipe(catchError(this.handleError));
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id)
      .pipe(
        catchError(this.handleError));
  }

  update(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({isRead: true})).pipe(
      catchError(this.handleError));
  }

  create(resource) {
    return this.http.post(this.url , JSON.stringify(resource))
      .pipe(
        catchError(this.handleError)
      );

  }

  private handleError(err: Response) {
    if (err.status === 404) {
      return throwError(new NotFoundError());
    } if (err.status === 400) {
      return throwError(new BadRequestError(err.json()));
    }
    return throwError(new AppError(err));
  }
}
