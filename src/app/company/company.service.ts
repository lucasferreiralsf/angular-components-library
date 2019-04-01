import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import 'rxjs/Rx'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CompanyService {

    constructor(private _http: HttpClient) {}

    get(): Observable<any> {
        const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin','*')
        .set('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS')
        .set('Access-Control-Allow-Headers','Origin, Content-Type, X-Auth-Token');
     

        return this._http.get('http://localhost:53488/api/empresa', { headers }).pipe(
            map((res) => res),
            catchError(error => of(error)));       
    }
}
