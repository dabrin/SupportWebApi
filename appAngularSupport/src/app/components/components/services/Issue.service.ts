import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Issue } from '../models/Issue';
import { Comment } from '../models/Comment';
import { Note } from '../models/Note';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class IssueService {
    private baseUrl = 'http://localhost:50044/api/Issue/';
    private urlNote = 'http://localhost:50044/api/Note/';



    issue: Issue;
    constructor(private http: HttpClient, private router: Router) { }

    getIssue(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}${id}`);
    }

    createIssue(issue: Issue): Observable<any> {
        return this.http.post(`${this.baseUrl}`, issue);
    }

    createCommet(value: Comment) {
        return this.http.post(`${this.baseUrl + 'CommentClient'}`, value);

    }

    getCommentList(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl + 'findCommentClientById/'}${id}`);
    }

    createNote(value: Note) {
        return this.http.post(`${this.urlNote}`, value);
    }

    getNote(id: number): Observable<any> {
        return this.http.get(`${this.urlNote}${id}`);
    }

    updateStatusIssue(reportNumber: number, val: string): Observable<any> {
      return this.http.put(this.baseUrl + 'UpdateStatus', {reportNumber, val});
    }

    getIssueList(): Observable<any> {
        return this.http.get(`${this.baseUrl}`);
    }


    getIssueClient(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl + 'findIssueClient/'}${id}`);

    }

    getUserClient(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl + 'findUserClientById/'}${id}`);

    }

    resolveIssue(id: number): Observable<any> {

        return null;
    }


}
