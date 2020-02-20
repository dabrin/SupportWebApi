import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Issue } from '../../models/Issue';
import { IssueService } from '../../services/Issue.service';
import { Router } from '@angular/router';
//import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-component',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class IssueCreateComponent implements OnInit {
    IssueForm: FormGroup;
    Report_Number = new FormControl('', [Validators.required]);
    Id_Supporter = new FormControl('', [Validators.required]);
    Classification = new FormControl('', [Validators.required]);
    Status = new FormControl('', [Validators.required]);
    Resolution_Comment = new FormControl('', [Validators.required]);

    constructor(private issueService: IssueService, public formBuilder: FormBuilder
        ,
        private router: Router) { }

    ngOnInit() {
        //this.reloadData();
    }
    createIssue() {

        const Report_Number = (document.querySelector('#Report_Number') as HTMLInputElement).value
        const Id_Supporter = (document.querySelector('#Id_Supporter') as HTMLInputElement).value
        const Classification = (document.querySelector('#Classification') as HTMLInputElement).value
        const Status = (document.querySelector('#Status') as HTMLInputElement).value
        const Resolution_Comment = (document.querySelector('#Resolution_Comment') as HTMLInputElement).value

        this.IssueForm = this.formBuilder.group({
            Report_Number: Report_Number,
            Id_Supporter: Id_Supporter,
            Status: Status,
            Classification: Classification,
            Resolution_Comment: Resolution_Comment

        })
        this.issueService.createIssue(this.IssueForm.value).subscribe(() => 'Succces', error => 'Error')

    }

    //postSuccessfulSave() { this.message("Registro creado satisfactoriamente", "Éxito"); }
}