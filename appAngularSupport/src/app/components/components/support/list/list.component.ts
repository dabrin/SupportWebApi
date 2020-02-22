import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../../models/Issue';
import { SupportService } from '../../services/Support.service';
import { Router } from '@angular/router';
//import { SupportComponent } from '../support.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    issues: Observable<Issue[]>;

    constructor(private suppService: SupportService,
        private router: Router) { }

    ngOnInit() {
        this.reloadData();
    }

    reloadData() {
        this.issues = this.suppService.getSupportList();
    }


}