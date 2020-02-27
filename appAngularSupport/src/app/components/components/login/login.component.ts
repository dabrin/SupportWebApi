import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  error: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      pass: ['', [Validators.required]],
    });
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) { return; }
    this.authenticationService.logout();
    this.authenticationService.authentication(this.email.value, this.pass.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/Issue']);
        },
        res => {
          this.error = res.error.text;
        });
  }

  get email() { return this.form.controls.email; }
  get pass() { return this.form.controls.pass; }

}
