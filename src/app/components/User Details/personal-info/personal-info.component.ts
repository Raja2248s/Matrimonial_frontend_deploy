import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  RouterLink,
  RouterLinkActive,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { NavbefloginComponent } from '../../navbar/nav-components/navbeflogin/navbeflogin.component';
import { RegistrationService } from '../../../services/registration/registration.service';
import { Registration } from '../../../models/registration/registration';
import { PersonalInfoService } from '../../../services/personal-info/personal-info.service';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    NavbefloginComponent,
  ],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css',
})
export class PersonalInfoComponent implements OnInit {
  photographBloodGroupForm: FormGroup;
  userName!: string;
  registration!: Registration;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registrationService: RegistrationService,
    private personalInfoService: PersonalInfoService,
    private route: ActivatedRoute
  ) {
    this.photographBloodGroupForm = this.formBuilder.group({
      photograph: [null, Validators.required],
      bloodGroup: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('userName') ?? '';
    this.loadRegistrationDetails();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.photographBloodGroupForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('bloodGroup', this.photographBloodGroupForm.get('bloodGroup')!.value);
      formData.append('registration', JSON.stringify(this.registration));

      this.personalInfoService.savePersonalInfo(formData).subscribe(
        (response) => {
          console.log('Personal-info received successfully');
          this.router.navigate(['/educationalinfo', this.userName]);
          alert('Personal info received successfully');
        },
        (error) => {
          console.error('Failed to save personal info:', error);
          alert('Failed to save personal info');
        }
      );
    } else {
      alert('Please fill out all required fields');
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
