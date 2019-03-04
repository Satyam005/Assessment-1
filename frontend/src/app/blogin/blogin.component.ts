import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

import { AlertService } from "../_services/alert.service";
import { AuthenticationService } from "../_services/authentication.service";

@Component({
  selector: 'app-blogin',
  templateUrl: './blogin.component.html',
  styleUrls: ['./blogin.component.css']
})
export class BloginComponent implements OnInit {

	bloginForm: FormGroup;
  	loading = false;
  	submitted = false;
  	returnUrl: string;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
    ) {
    if (this.authenticationService.currentUserValue) {
     this.router.navigate(["/"]);
     }
 }
  ngOnInit() {
  	this.bloginForm = this.formBuilder.group({
      username: ["", Validators.required],
      businessid:["", Validators.required],
      password: ["", Validators.required]
  });
		this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
   }

get f() {
    return this.bloginForm.controls;
  }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.bloginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .blogin(this.f.username.value, this.f.businessid.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}