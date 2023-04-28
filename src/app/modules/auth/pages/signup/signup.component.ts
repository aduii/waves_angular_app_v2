import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  titulo: string = 'Sign Up';
  signUpForm: FormGroup;
  ngOnInit(): void {}
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]]
    });
  }

  get f() {
    return this.signUpForm.controls;
  }

  redireccionar() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }

    console.log('Formulario válido');
    console.log(this.signUpForm.value);

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value))
  }
}
