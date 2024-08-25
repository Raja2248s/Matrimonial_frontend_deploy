import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NavbefloginComponent } from '../../navbar/nav-components/navbeflogin/navbeflogin.component';
import { RegistrationService } from '../../../services/registration/registration.service';
import { Registration } from '../../../models/registration/registration';
import { EducationCareerService } from '../../../services/education-level/education-level.service';

@Component({
  selector: 'app-educational-info',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NavbarComponent, RouterLinkActive, NavbefloginComponent],
  templateUrl: './educational-info.component.html',
  styleUrls: ['./educational-info.component.css']
})
export class EducationalInfoComponent implements OnInit {
  educationInfoForm: FormGroup;
  userName!: string;
  registration!: Registration;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registrationService: RegistrationService,
    private educationService: EducationCareerService,
    private route: ActivatedRoute
  ) {
    this.educationInfoForm = this.formBuilder.group({
      educationLevel: ['', Validators.required],
      educationField: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('userName') ?? '';
    this.loadRegistrationDetails();
  }

  onSubmit() {
    if (this.educationInfoForm.valid) {
      const educationInfo = {
        educationLevel: this.educationInfoForm.get('educationLevel')!.value,
        educationField: this.educationInfoForm.get('educationField')!.value,
        registration: this.registration
      };

      alert('Educational info received successfully');

      this.educationService.saveEducationInfo(educationInfo).subscribe(
        (response) => {
          console.log('Educational info received successfully');
          this.router.navigate(['/familyinfo', this.userName]);
        },
        (error) => {
          console.error('Failed to save educational info:', error);
        }
      );

    } else {
      alert('Please fill out all required fields.');
    }
  }

  loadRegistrationDetails(): void {
    this.registrationService.findByUserName(this.userName).subscribe(
      (data: Registration) => {
        this.registration = data;
      },
      (error) => {
        console.log('Error fetching registration details:', error);
      }
    );
  }
}
