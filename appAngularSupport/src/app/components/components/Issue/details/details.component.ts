import { Component, OnInit } from '@angular/core';
import { Issue } from '../../models/Issue';
import { IssueService } from '../../services/Issue.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListComponent } from '../list/list.component';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
    id: number;
    issue: Issue;

    constructor(private route: ActivatedRoute, private router: Router,
        private issueService: IssueService) { }

    ngOnInit() {
        this.issue = new Issue();
        this.id = this.route.snapshot.params.id;
        this.issueService.getIssue(this.id)
            .subscribe(data => {
                console.log(data);
                this.issue = data;
            }, error => console.log());
    }

    list() {
        this.router.navigate(['Issue']);
    }

}