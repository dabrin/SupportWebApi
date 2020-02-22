import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Support } from '../models/Support';

@Injectable({
    providedIn: 'root'
})
export class SupportService {
    private baseUrl = 'http://localhost:50044/api/Supporter/';
    //private urlClient = '';
    constructor(private http: HttpClient) { }

    getIssue(id: number): Observable<any> {
        //return this.http.get(`${this.baseUrl}${id}`).subscribe((data) => { });
        return this.http.get(`${this.baseUrl}${id}`);
    }

    createSupport(supp: Support): Observable<any> {
        return this.http.post(`${this.baseUrl}`, supp);
    }



    getSupportList(): Observable<any> {

        return this.http.get(`${this.baseUrl}`);

    }
}