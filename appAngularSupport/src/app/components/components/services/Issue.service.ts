import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Issue } from '../models/Issue';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class IssueService {
    private baseUrl = 'http://localhost:50044/api/issue/';
    private urlIssueClient = 'http://localhost:50044/api/issueUserContact/';
    private urlUser = 'http://localhost:50044/api/User/';
    issue: Issue;
    constructor(private http: HttpClient, private router: Router) { }

    getIssue(id: number): Observable<any> {
        //return this.http.get(`${this.baseUrl}${id}`).subscribe((data) => { });
        return this.http.get(`${this.baseUrl}${id}`);
    }

    createIssue(issue: Issue): Observable<any> {
        return this.http.post(`${this.baseUrl}`, issue);
    }

    updateIssue(value: Issue) {
        //this.router.navigate(['Issue']);
        //console.log(value);
        //console.log(this.baseUrl + issue)


        return this.http.put('http://localhost:50044/api/issue/', value).subscribe(
            response => value as Issue,
            error => console.log(error)
        );

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