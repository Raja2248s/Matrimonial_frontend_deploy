import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NavbefloginComponent } from '../../navbar/nav-components/navbeflogin/navbeflogin.component';
import { RegistrationService } from '../../../services/registration/registration.service';
import { FamilyInfoService } from '../../../services/family-info/family-info.service';
import { Registration } from '../../../models/registration/registration';
import { FamilyInfo } from '../../../models/family-info/family-info';

@Component({
  selector: 'app-family-info',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule, NavbarComponent, NavbefloginComponent],
  templateUrl: './family-info.component.html',
  styleUrls: ['./family-info.component.css'],
})
export class FamilyInfoComponent implements OnInit {

  familyInfoForm: FormGroup;
  userName!: string;
  registration!: Registration;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registrationService: RegistrationService,
    private familyInfoService: FamilyInfoService,
    private route: ActivatedRoute
  ) {
    this.familyInfoForm = this.formBuilder.group({
      familyStatus: ['', Validators.required],
      familyType: ['', Validators.required],
      fatherName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('userName') ?? '';
    this.loadRegistrationDetails();
  }

  onSubmit() {
    if (this.familyInfoForm.valid) {
      const familyInfo: FamilyInfo = {
        familyStatus: this.familyInfoForm.get('familyStatus')!.value,
        familyType: this.familyInfoForm.get('familyType')!.value,
        fatherName: this.familyInfoForm.get('fatherName')!.value,
        registration: this.registration
      };

      this.familyInfoService.saveFamilyInfo(familyInfo).subscribe(
        (response) => {
          console.log(response);
          alert('Family info saved successfully');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Failed to save family info:', error);
          alert('Failed to save family info');
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
