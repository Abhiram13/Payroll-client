import { Component, ViewChild } from '@angular/core';
import { InputFieldDirective } from '../../directives/input-directive/input-field.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';

@Component({
   selector: 'login',
   standalone: true,
   imports: [InputFieldDirective, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule, MatFormFieldModule],
   templateUrl: './login.component.html',
   styleUrl: './login.component.scss'
})
export class LoginComponent {
   @ViewChild(InputFieldDirective) 
   input!: InputFieldDirective;
   loginForm!: FormGroup;

   constructor(private http: HttpService) { 
      this.loginForm = new FormGroup({
         user_name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+@[a-z]+$')]),
         password: new FormControl('', [Validators.required])
      });
   }

   get user_name(): FormControl {
      return this.loginForm.get('user_name') as FormControl;
   }

   get password(): FormControl {
      return this.loginForm.get('password') as FormControl;
   }

   submit() {
      console.log(this.loginForm.get('user_name')?.value);
      console.log(this.loginForm.get('password')?.value)
   }

   sendHttpRequest() {
      this.http.get<any>(this.input.value).subscribe(response => {
         console.log({response});
      })
   }
}