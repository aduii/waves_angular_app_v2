import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  titulo: string = 'WAVES';
  loginForm: FormGroup;
  ngOnInit(): void {}
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  redireccionar() {
    this.router.navigate(['/signup']);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    console.log('Formulario válido');
    console.log(this.loginForm.value);

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value))
  }
}
