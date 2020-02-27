import { Component, OnInit } from '@angular/core';
import { Issue } from '../../models/Issue';
import { Support } from '../../models/Support';
import {IssueClient} from '../../models/IssueClient';
import { User } from '../../models/User';
import { Comment } from '../../models/Comment';
import { Note } from '../../models/Note';
import { IssueService } from '../../services/Issue.service';
import { SupportService } from '../../services/Support.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
    id: number;
    issue: Issue;
    issueClient: IssueClient;
    user: User;
    comment: Comment;
    note: Note;
    comments: Observable<Comment[]>;
    notes: Observable<Note[]>;
    supports: Observable<Support[]>;
    loading: boolean;
    error: null;

    constructor(private route: ActivatedRoute, private router: Router,
                private issueService: IssueService, private suppService: SupportService) { }

    ngOnInit() {
        this.issue = new Issue();
        this.issueClient = new IssueClient();
        this.user = new User();
        this.comment = new Comment();
        this.note = new Note();
        this.id = this.route.snapshot.params.id;

        this.issueService.getIssueClient(this.id).subscribe(data => {
            this.issueClient = data;
            this.issueService.getUserClient(this.issueClient.userById)
              // tslint:disable-next-line:no-shadowed-variable
                .subscribe(data => {
                    this.user = data;
                }, error => console.log());
        }, error => console.log());

        this.issueService.getIssue(this.id)
            .subscribe(data => {
                this.issue = data;
            }, error => console.log());

        this.reloadData();
    }

    reloadData() {
        this.supports = this.suppService.getSupportList();
        this.comments = this.issueService.getCommentList(this.id);
        this.notes = this.issueService.getNote(this.id);
    }

    list() {
        this.router.navigate(['Issue']);
    }

    updateStatus(status: string) {
      this.issueService.updateStatusIssue(this.id, status);
    }

    addComment() {
        this.comment.description = (document.querySelector('#comment') as HTMLTextAreaElement).value;
        this.comment.issueByReportNumber = this.issue.Report_Number;
        this.issueService.createCommet(this.comment).subscribe(() => 'Succces', error => 'Error');
    }
    addNote() {
        this.note.Report_Number = this.issue.Report_Number;
        this.note.Note_Time = '2020-02-23T15:48:23.933Z';
        this.note.Description = (document.querySelector('#note') as HTMLTextAreaElement).value;
        this.issueService.createNote(this.note).subscribe(() => 'Succces', error => 'Error');

    }
}
