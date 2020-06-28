import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { CasesComponent } from '../app/cases/cases.component'
import { Statistic } from './statistic';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:4200/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getCases(): Observable<CasesComponent[]> {
    return this.http.get<CasesComponent[]>(`${apiUrl}`)
      .pipe(
        tap(cases => console.log('fetched cases')),
        catchError(this.handleError('getCases', []))
      );
  }

  getCasesById(id: string): Observable<CasesComponent> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<CasesComponent>(url).pipe(
      tap(_ => console.log(`fetched cases id=${id}`)),
      catchError(this.handleError<CasesComponent>(`getCasesById id=${id}`))
    );
  }

  addCases(cases: CasesComponent): Observable<CasesComponent> {
    return this.http.post<CasesComponent>(apiUrl, cases, httpOptions).pipe(
      tap((c: CasesComponent) => console.log(`added cases w/ id=${c._id}`)),
      catchError(this.handleError<CasesComponent>('addCases'))
    );
  }

  updateCases(id: string, cases: CasesComponent): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, cases, httpOptions).pipe(
      tap(_ => console.log(`updated cases id=${id}`)),
      catchError(this.handleError<any>('updateCases'))
    );
  }

  deleteCases(id: string): Observable<CasesComponent> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<CasesComponent>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted cases id=${id}`)),
      catchError(this.handleError<CasesComponent>('deleteCases'))
    );
  }

  getStatistic(status: string): Observable<Statistic> {
    const url = `${apiUrl}/daily/${status}`;
    return this.http.get<Statistic>(url).pipe(
      tap(_ => console.log(`fetched statistic status=${status}`)),
      catchError(this.handleError<Statistic>(`getStatistic status=${status}`))
    );
  }
}
