import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../../models/Issue';
import { IssueService } from '../../services/Issue.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    issues: Observable<Issue[]>;

    constructor(private issueService: IssueService,
        private router: Router) { }

    ngOnInit() {
        this.reloadData();
    }

    reloadData() {
        this.issues = this.issueService.getIssueList();
    }

    driverDetails(id: number) {
        this.router.navigate(['details', id]);
    }
}