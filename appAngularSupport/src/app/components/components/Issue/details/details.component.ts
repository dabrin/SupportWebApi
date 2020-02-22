import { Component, OnInit } from '@angular/core';
import { Issue } from '../../models/Issue';
import { Support } from '../../models/Support';
import { IssueContact } from '../../models/IssueContact';
import { User } from '../../models/User';
import { IssueService } from '../../services/Issue.service';
import { SupportService } from '../../services/Support.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListComponent } from '../list/list.component';
import { Observable } from 'rxjs';

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
    supports: Observable<Support[]>;
    constructor(private route: ActivatedRoute, private router: Router,
        private issueService: IssueService, private suppService: SupportService) { }

    ngOnInit() {

        this.issue = new Issue();
        this.issContact = new IssueContact();
        this.user = new User();
        this.id = this.route.snapshot.params.id;
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

    }

    list() {
        this.router.navigate(['Issue']);
    }


    updateState() { }
    addComment() { }
    addNote() { }


}