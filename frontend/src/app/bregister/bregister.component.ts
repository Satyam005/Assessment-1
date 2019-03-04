import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService } from "../_services/user.service";
import { AuthenticationService } from "../_services/authentication.service";
import { AlertService } from "../_services/alert.service";

@Component({
  selector: 'app-bregister',
  templateUrl: './bregister.component.html',
  styleUrls: ['./bregister.component.css']
})
export class BregisterComponent implements OnInit {
	bregisterForm: FormGroup;
  	loading = false;
  	submitted = false;
  	bid;

  constructor(
	  	private formBuilder: FormBuilder,
	    private router: Router,
	    private authenticationService: AuthenticationService,
	    private userService: UserService,
	    private alertService: AlertService
  	) {
  	if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
  	 }
    }

  ngOnInit() {
      	this.bid='BID-'+Math.round((Math.random())*1000000)
  		  this.bregisterForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: [''],
          phone: ['',Validators.required],
          gender: ['',Validators.required]
       });
    }

get f() { return this.bregisterForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.bregisterForm.invalid) {
          return;
      }

      this.loading = true;
      this.userService.register(this.bregisterForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Registration successful', true);
                  this.router.navigate(['/firstpage']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
}