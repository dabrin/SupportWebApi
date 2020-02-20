import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//JALAR EL SERVICIO

@Component({
    selector: 'app-support',
    templateUrl: './support.component.html',
    styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

    supportForm: FormGroup;
    title: string = "Create";
    id: number;
    errorMessage: any;

    constructor() { }

    ngOnInit(): void {

    }


}