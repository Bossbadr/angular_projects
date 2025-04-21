import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, onErrorResumeNext, throwError } from 'rxjs';
import { User } from '../models/model.interface'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://6800db31b72e9cfaf728f609.mockapi.io/crud/api/v1';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse){
    let errorMessage = 'Ocurrió un error desconocido';

    if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Codigo de error ${error.status}:  ${error.message}`;
    }

    console.log(errorMessage);

    return throwError(() => new Error(errorMessage));
  }

  // Aqui iran los metodos CRUD

  getUsers(): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>(`${this.apiUrl}/users`, {observe: 'response'})
    .pipe(
      catchError(this.handleError)
    );
  }

  getUserById(id: number): Observable<HttpResponse<User>>{
    return this.http.get<User>(`${this.apiUrl}/users/${id}`, {observe: 'response'})
    .pipe(
      catchError(this.handleError)
    );
  }

  addUser(post: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.apiUrl}/users`, post, {observe: 'response'})
    .pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: number, post: User): Observable<HttpResponse<User>> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, post, {observe: 'response'})
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteItem(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`, {observe: 'response'})
    .pipe(
      catchError(this.handleError)
    )
  }




}
