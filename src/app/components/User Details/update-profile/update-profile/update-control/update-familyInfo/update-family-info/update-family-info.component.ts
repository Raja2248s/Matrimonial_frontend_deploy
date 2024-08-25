import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FamilyInfoService } from '../../../../../../../services/family-info/family-info.service';
import { FamilyInfo } from '../../../../../../../models/family-info/family-info';
import { Registration } from '../../../../../../../models/registration/registration';
import { RegistrationService } from '../../../../../../../services/registration/registration.service';

@Component({
  selector: 'app-update-family-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-family-info.component.html',
  styleUrls: ['./update-family-info.component.css']
})
export class UpdateFamilyInfoComponent implements OnInit {
  familyForm!: FormGroup;
  loggedInUser: string = '';
  registration!: Registration;
  familyInfos: any;
  familyInfo: any;
  familyId!: number;

  constructor(
    private fb: FormBuilder,
    private familyInfoService: FamilyInfoService,
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.familyForm = this.fb.group({
      familyStatus: ['', Validators.required],
      familyType: ['', Validators.required],
      fatherName: ['', Validators.required]
    });

    this.loggedInUser = sessionStorage.getItem('loggedInUser') ?? '';
    this.loadRegistrationDetails();
  }

  loadRegistrationDetails(): void {
    this.registrationService.findByUserName(this.loggedInUser).subscribe(
      (data: Registration) => {
        this.registration = data;
        this.loadFamilyInfo();
      },
      (error) => {
        console.log('Error fetching registration details:', error);
      }
    );
  }

  loadFamilyInfo(): void {
    this.familyInfoService.getAllFamilyInfo().subscribe((familyInfos: any) => {
      this.familyInfos = familyInfos;
      this.familyInfo = this.familyInfos.find((fi: { registration: { rid: number; }; }) => fi.registration.rid === this.registration.rid);
      if (this.familyInfo) {
        this.familyId = this.familyInfo.id;
        this.familyInfoService.getFamilyInfoById(this.familyId).subscribe((data: FamilyInfo) => {
          this.familyForm.patchValue(data);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.familyForm.valid) {
      const familyInfo = {
        familyStatus: this.familyForm.get('familyStatus')!.value,
        familyType: this.familyForm.get('familyType')!.value,
        fatherName: this.familyForm.get('fatherName')!.value,
        registration: this.registration
      };
      this.familyInfoService.updateFamilyInfo(this.familyId, familyInfo).subscribe(
        response => {
          alert('FamilyInfo successfully updated');
          console.log('Update successful:', response);
        },
        error => {
          alert('Failed to update FamilyInfo');
          console.error('Update failed:', error);
        }
      );
    }
  }
}
