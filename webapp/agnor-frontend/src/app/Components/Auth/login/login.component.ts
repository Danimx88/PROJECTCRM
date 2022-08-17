import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { first } from 'rxjs/operators';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // loginForm: FormGroup;

  // constructor(
  //   private authService: LoginService,
  //   private formBuilder: FormBuilder,
  //   private router: Router,
  // ) { }

  // ngOnInit(): void {
  //   this.loginForm = new FormGroup({
  //     usuario: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  //     contrasena: new FormControl(null, [Validators.required, Validators.minLength(3)])
  //   })
  // }

  // onSubmit() {
  //   if (this.loginForm.invalid) {
  //     return;
  //   }
  //   this.authService.login(this.loginForm.value).pipe(
  //     map(token => this.router.navigate(['/']))
  //   ).subscribe()

  // }
  hide = true;
  loginForm: FormGroup;
  showSpinner = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: LoginService,
    
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.showSpinner = true;
    this.authenticationService
      .login2(this.f['usuario'].value, this.f['contrasena'].value)
      .pipe(first())
      .subscribe(
        data => {
          this.error = 'Usuario o contraseña incorrecto';
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          console.log(error);
          this.showSpinner = false;
        }
      );
  }


}
