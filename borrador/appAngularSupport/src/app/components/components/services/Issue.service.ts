import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Issue } from '../models/Issue';

@Injectable({
    providedIn: 'root'
})
export class IssueService {
    private baseUrl = 'http://localhost:50044/api/issue/';

    constructor(private http: HttpClient) { }

    getIssue(id: number): Observable<any> {
        //return this.http.get(`${this.baseUrl}${id}`).subscribe((data) => { });
        return this.http.get(`${this.baseUrl}${id}`);
    }

    createDriver(driver: Issue): Observable<any> {
        return this.http.post(`${this.baseUrl}`, driver);
    }

    updateDriver(id: number, value: Issue): Observable<any> {
        return this.http.put(`${this.baseUrl}${id}`, value);
    }

    deleteDriver(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}${id}`);
    }

    getIssueList(): Observable<any> {

        //console.log(`${this.baseUrl}`);
        //console.log(this.http.get(`${this.baseUrl}`).pipe(map((res: any) => { return res })));

        return this.http.get(`${this.baseUrl}`);
        //
    }
}