import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { NavbefloginComponent } from '../../navbar/nav-components/navbeflogin/navbeflogin.component';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NavbefloginComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
  forgotForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();

    if (this.forgotForm.valid) {
      emailjs.sendForm(
        'service_pcuqq4v', 
        'template_3jwqcuc', 
        e.target as HTMLFormElement, 
        'lYgcIczg9xUIwqbh6'
      ).then(
        () => {
          console.log('SUCCESS!');
          alert('A reset link sent to your Email! Check your email and Reset your Password');
          this.router.navigate(['/login']);
        },
        (error: EmailJSResponseStatus) => {
          console.log('FAILED...', error.text);
          alert('Failed to send reset link. Please try again later.');
        }
      );
    } else {
      alert('Please fill out all required fields');
    }
  }
}
