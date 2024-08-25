import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../../navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../../../services/contact-info/contact.service';
import { Contact } from '../../../../models/contact-info/contact';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NavbarComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const contact: Contact = this.contactForm.value;
      this.contactService.saveContact(contact).subscribe(
        response => {
          alert('We received your query. We will reply as soon as possible.');
          this.contactForm.reset();
        },
        error => {
          alert('Something went wrong! ' + error.message);
        }
      );
    }
  }

}
