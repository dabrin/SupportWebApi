import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../../models/Issue';
import { IssueService } from '../../services/Issue.service';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    issues: Observable<Issue[]>;

    constructor(private issueService: IssueService,
                private router: Router, private auth: AuthenticationService) {
      if (!this.auth.isUserLoggedIn()) { this.router.navigate(['login']); }
    }

    ngOnInit() {
        this.reloadData();
    }

    reloadData() {
        if (this.auth.role === 'USO') { this.issues = this.issueService.getIssueListBySupportId(this.auth.userId); }
        else { this.issues = this.issueService.getIssueList(); }
    }

    issueDetails(id: number) {
        this.router.navigate(['details', id]);
    }
}
