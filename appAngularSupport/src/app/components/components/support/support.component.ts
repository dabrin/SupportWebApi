import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Support } from '../models/Support';
import { SupportService } from '../services/Support.service';
//JALAR EL SERVICIO

@Component({
    selector: 'app-support',
    templateUrl: './support.component.html',
    styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {


    support: boolean;
    supervisor: boolean;
    supportForm: FormGroup;
    Pass = new FormControl('', [Validators.required]);
    Name = new FormControl('', [Validators.required]);
    First_SurName = new FormControl('', [Validators.required]);
    Second_Surname = new FormControl('', [Validators.required]);
    Email = new FormControl('', [Validators.required]);

    constructor(private supportService: SupportService, public formBuilder: FormBuilder
        ,
        private router: Router) { }

    ngOnInit(): void {

    }

    createSupport() {

        const Pass = (document.querySelector('#Pass') as HTMLInputElement).value
        const Name = (document.querySelector('#Name') as HTMLInputElement).value
        const First_SurName = (document.querySelector('#First_L') as HTMLInputElement).value
        const Second_Surname = (document.querySelector('#Second_L') as HTMLInputElement).value
        const Email = (document.querySelector('#Email') as HTMLInputElement).value

        this.supportForm = this.formBuilder.group({
            Pass: Pass,
            Name: Name,
            First_SurName: First_SurName,
            Second_Surname: Second_Surname,
            Email: Email

        })

        if (this.supervisor == true) {
            console.log('superviso');
            this.supportService.createSupervisor(this.supportForm.value).subscribe(() => 'Succces', error => 'Error')

        } else
            this.supportService.createSupport(this.supportForm.value).subscribe(() => 'Succces', error => 'Error')

        console.log('Easy')
    }
    foroMostrar() {

        if (this.supervisor == true) {
            console.log('superviso');

        } else
            console.log('No mames');
    }





}