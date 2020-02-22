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
    private urlIssueClient = 'http://localhost:50044/api/issueUserContact/';
    private urlUser = 'http://localhost:50044/api/User/';

    constructor(private http: HttpClient) { }

    getIssue(id: number): Observable<any> {
        //return this.http.get(`${this.baseUrl}${id}`).subscribe((data) => { });
        return this.http.get(`${this.baseUrl}${id}`);
    }

    createIssue(issue: Issue): Observable<any> {
        return this.http.post(`${this.baseUrl}`, issue);
    }

    updateDriver(id: number, value: Issue): Observable<any> {
        return this.http.put(`${this.baseUrl}${id}`, value);
    }

    deleteDriver(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}${id}`);
    }

    getIssueList(): Observable<any> {

        return this.http.get(`${this.baseUrl}`);

    }


    getIssueContact(id: number): Observable<any> {
        return this.http.get(`${this.urlIssueClient}${id}`);

    }

    getUser(id: number): Observable<any> {
        return this.http.get(`${this.urlUser}${id}`);

    }
}