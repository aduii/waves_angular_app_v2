import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  titulo: string = 'WAVES';
  user: User = {  id:0,email: '', name: '', password: '' }
  loginForm: FormGroup;
  ngOnInit(): void {}
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  getUserByEmail() {
    const email = this.loginForm.get('email')?.value;
    this.loginService.getUserByEmail(email).subscribe(
      (response) => {
        this.user.id = response[0].id;
        this.user.email = response[0].email;
        this.user.name = response[0].name;
        this.user.password = response[0].password;
        this.loginService.setUser({
        id: this.user.id,
        name: this.user.name,
        email: this.user.email,
        });
        this.onSubmit();
        // localStorage.setItem('name', this.user[0].name);
        // localStorage.setItem('email', this.user[0].email);
      },
      (error) => {
        // Maneja los errores en caso de que ocurra alguno
        console.error(error);
      }

    );

  }

  renderSignUp() {
    this.router.navigate(['/signup']);
  }

  renderDashboard() {
    this.router.navigate(['/dashboard']);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.get('email')?.value != this.user.email || this.loginForm.get('password')?.value != this.user.password) {
      alert('ERROR!!\n\n' + 'Incorrect Credentials, Try Again...');
      return;
    }
    alert('SUCCESS!!\n\n' + 'Redirecting to Dashboard...');
    this.renderDashboard();
  }
}
