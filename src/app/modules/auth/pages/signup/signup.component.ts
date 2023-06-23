import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  titulo: string = 'Sign Up';
  signUpForm: FormGroup;
  ngOnInit(): void {}
  constructor(private formBuilder: FormBuilder, private router: Router, private signupService: SignupService) {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    }
    );
  }

  get f() {
    return this.signUpForm.controls;
  }

  passwordMatchValidator(form: FormGroup) {
    const passwordValue = form.get('password')?.value;
    const password2Value = form.get('password2')?.value;

    if (passwordValue !== password2Value) {
      form.get('password2')?.setErrors({ passwordMismatch: true });
    } else {
      form.get('password2')?.setErrors(null);
    }
  }

  ValidateDuplicateUser(){
    const email = this.signUpForm.get('email')?.value;
    this.signupService.getUserByEmail(email).subscribe(
      (response) => {
        if(response.length > 0){
          alert('This email is already registered')
        }
        else{
          this.onSubmit();
        }
      },
      (error) => {
        // Maneja los errores en caso de que ocurra alguno
        console.error(error);
      }
    );
  }

  createUser() {
    const user = {name: this.signUpForm.get('name')?.value, email: this.signUpForm.get('email')?.value, password: this.signUpForm.get('password')?.value};
    this.signupService.createUser(user).subscribe(
      response => {
        console.log('User created successfully', response);
      },
      error => {
        console.error('Error creating user', error);
      }
    );
  }


  redireccionar() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }

    alert('SUCCESS!!\n\n'+'Account Created for ' + JSON.stringify(this.signUpForm.get('name')?.value))
    this.createUser();
    this.redireccionar();
  }
}
