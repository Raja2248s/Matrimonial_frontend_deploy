import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../../../services/contact-info/contact.service';
import { ActivatedRoute } from '@angular/router';
import { Reply } from '../../../../models/reply/reply';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  contactForm1: FormGroup;
  name: string = '';
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute
  ) {
    this.contactForm1 = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'] || '';
      this.email = params['email'] || '';

      // Set the values of the form controls
      this.contactForm1.patchValue({
        name: this.name,
        email: this.email
      });
    });
  }

  onSubmit() {
    if (this.contactForm1.valid) {
      const contact: Reply = this.contactForm1.value;
      this.contactService.saveReply(contact).subscribe(
        response => {
          alert('Message sent successfully.');
          this.contactForm1.reset();
        },
        error => {
          alert('Something went wrong: ' + error.message);
        }
      );
    }
  }
}
