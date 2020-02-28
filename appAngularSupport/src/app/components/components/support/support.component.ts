import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Support } from '../models/Support';
import { SupportService } from '../services/Support.service';
import swal from "sweetalert2";
import {AuthenticationService} from '../services/authentication.service';

//JALAR EL SERVICIO

@Component({
    selector: 'app-support',
    templateUrl: './support.component.html',
    styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

/*
    support: boolean;
    supervisor: boolean;
    supportForm: FormGroup;
    Pass = new FormControl('', [Validators.required]);
    Name = new FormControl('', [Validators.required]);
    First_SurName = new FormControl('', [Validators.required]);
    Second_Surname = new FormControl('', [Validators.required]);
    Email = new FormControl('', [Validators.required]);
    */

   form: FormGroup;
   submitted = false;
   error = '';
   loading: boolean = false;


        constructor(private formBuilder: FormBuilder,
            private router: Router,
            private supportService: SupportService, private auth: AuthenticationService) {
          if (!this.auth.isUserLoggedIn()) { this.router.navigate(['login']); }
  this.form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
    First_L: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
    Second_L: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
 });
}


    ngOnInit(): void {

    }


  submit() {
    this.error = '';
    this.submitted = true;
    if (this.form.invalid || this.loading) { return; }
    this.blockForm();
    const user = new Support();
    user.Email = this.email.value;
    user.Pass = this.pass.value;
    user.Name = this.name.value;
    user.First_SurName = this.First_L.value;
    user.Second_Surname = this.Second_L.value;
    this.supportService.createSupport(user).subscribe(data => {
      swal.fire({
        icon: 'success',
        text: 'El registro fue éxitoso'
      }).finally(() => {
        this.router.navigate(['/Issue']);
      });
    }, res => {
      this.error = res.error.text;
      this.unBlockForm();
    });
  }

  blockForm() {
    this.loading = true;
    this.form.disable();
  }

  unBlockForm() {
    this.loading = false;
    this.form.enable();
  }

  get email() { return this.form.get('email'); }
  get pass() { return this.form.get('pass'); }
  get name() { return this.form.get('name'); }
  get First_L() { return this.form.get('First_L'); }
  get Second_L() { return this.form.get('Second_L'); }

}
