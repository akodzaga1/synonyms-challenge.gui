import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { SynonymsList } from '../models/synonyms-list';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL = 'http://localhost:2508/api';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllSynonyms(postData: any): Observable<SynonymsList> {
    return this.http
      .post<SynonymsList>(
        this.apiURL + '/allsynonyms',
        JSON.stringify(postData),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  getMySynonyms(postData: any): Observable<SynonymsList> {
    return this.http
      .post<SynonymsList>(
        this.apiURL + '/mysynonyms',
        JSON.stringify(postData),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    // window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
  
}
