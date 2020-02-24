import { Component, OnInit } from '@angular/core';
import { Issue } from '../../models/Issue';
import { Support } from '../../models/Support';
import { IssueContact } from '../../models/IssueContact';
import { User } from '../../models/User';
import { Comment } from '../../models/Comment';
import { Note } from '../../models/Note';
import { IssueService } from '../../services/Issue.service';
import { SupportService } from '../../services/Support.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListComponent } from '../list/list.component';
import { Observable } from 'rxjs';
import { NotExpr } from '@angular/compiler';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
    id: number;
    issue: Issue;
    issContact: IssueContact;
    user: User;
    comment: Comment;
    note: Note;
    comments: Observable<Comment[]>;
    supports: Observable<Support[]>;
    notes: Observable<Note[]>;
    constructor(private route: ActivatedRoute, private router: Router,
        private issueService: IssueService, private suppService: SupportService) { }

    ngOnInit() {

        this.issue = new Issue();
        this.issContact = new IssueContact();
        this.user = new User();
        this.comment = new Comment();
        this.id = this.route.snapshot.params.id;
        this.note = new Note();


        this.issueService.getIssueContact(this.id).subscribe(data => {
            console.log(data);
            this.issContact = data;
        }, error => console.log());


        this.issueService.getIssue(this.id)
            .subscribe(data => {
                console.log(data);
                this.issue = data;
            }, error => console.log());

        this.issueService.getUser(this.id)
            .subscribe(data => {
                console.log(data);
                this.user = data;
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


    updateState() {
        //this.router.navigate(['Issue']);
        this.issue.Status = 'Asignado';
        this.issue.Report_Number = 1;
        console.log(this.issue);
        this.issueService.updateIssue(this.issue);

    }
    addComment() {
        this.comment.Description = (document.querySelector('#comment') as HTMLTextAreaElement).value;
        this.comment.issueByReportNumber = this.issue.Report_Number;
        this.comment.commentTime = '2020-02-23T15:48:23.933Z';
        this.issueService.createCommet(this.comment).subscribe(() => 'Succces', error => 'Error');

    }
    addNote() {
        this.note.Report_Number = this.issue.Report_Number;
        this.note.Note_Time = '2020-02-23T15:48:23.933Z';
        this.note.Description = (document.querySelector('#note') as HTMLTextAreaElement).value;
        this.issueService.createNote(this.note).subscribe(() => 'Succces', error => 'Error');

    }


}