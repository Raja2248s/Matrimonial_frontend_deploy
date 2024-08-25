import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NavbefloginComponent } from '../../navbar/nav-components/navbeflogin/navbeflogin.component';
import { RegistrationService } from '../../../services/registration/registration.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    CommonModule,
    NavbarComponent,
    NavbefloginComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  userForm!: FormGroup;
  isFormSubmitted: boolean = false;
  rid: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registrationService: RegistrationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.minLength(3)],
      password: ['', Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)],
      email: ['', Validators.email],
    });
  }

  onSubmit(e: Event): void {
    this.isFormSubmitted = true;

    if (this.userForm.valid) {
      const registrationData = this.userForm.value;
      console.log(registrationData);

      this.registrationService.saveRegistration(registrationData).subscribe(
        (response) => {
          this.rid = +response.rid.toString();
          this.registrationService.setrid(this.rid);
          console.log('signup comp:', this.registrationService.getrid());
          console.log('Registration successful signup comp:', response);

          // Email verification
          emailjs
            .sendForm(
              'service_pcuqq4v', 
              'template_xpqcc9v', 
              e.target as HTMLFormElement, 
              {
                publicKey: 'lYgcIczg9xUIwqbh6',
              }
            )
            .then(
              () => {
                console.log('SUCCESS!');
                alert('Registration successful! Please verify your email now.');
                this.router.navigate(['/home']);
              },
              (error) => {
                console.log('FAILED...', (error as EmailJSResponseStatus).text);
              }
            );
        },
        (error) => {
          console.error('Registration failed:', error);
          alert('Something went wrong! Please provide valid details.');
        }
      );
    } else {
      alert('Please fill out all required fields');
    }
  }
}
