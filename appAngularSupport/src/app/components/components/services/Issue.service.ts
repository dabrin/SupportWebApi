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
    private baseUrl = 'http://localhost:50044/api/issue/';
    private urlIssueClient = 'http://localhost:50044/api/issueUserContact/';
    private urlUser = 'http://localhost:50044/api/User/';
    private urlComment = 'http://localhost:50044/api/comment/';
    private urlNote = 'http://localhost:50044/api/Note/';



    issue: Issue;
    constructor(private http: HttpClient, private router: Router) { }

    getIssue(id: number): Observable<any> {
        //return this.http.get(`${this.baseUrl}${id}`).subscribe((data) => { });
        return this.http.get(`${this.baseUrl}${id}`);
    }

    createIssue(issue: Issue): Observable<any> {
        return this.http.post(`${this.baseUrl}`, issue);
    }


    createCommet(value: Comment) {
        return this.http.post(`${this.urlComment}`, value);

    }
    createNote(value: Note) {
        return this.http.post(`${this.urlNote}`, value)
    }

    getNote(id:number): Observable<any> {
        return this.http.get(`${this.urlNote}${id}`);
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

    getCommentList(id: number): Observable<any> {
        return this.http.get(`${this.urlComment}${id}`)

    }
}