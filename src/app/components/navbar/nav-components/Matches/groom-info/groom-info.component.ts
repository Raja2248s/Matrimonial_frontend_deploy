import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../../../navbar.component';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-groom-info',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NavbarComponent],
  templateUrl: './groom-info.component.html',
  styleUrls: ['./groom-info.component.css']
})
export class GroomInfoComponent implements OnInit {
  user!: any;
  loggedInUser: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.user = history.state.user;
    this.loggedInUser = sessionStorage.getItem('loggedInUser');
    console.log(this.user); 
  }

  chatBtnDisabled = true;
  interestBtnDisabled = false;
  intrestButton = 'Share Interest';

  OnChatClick(): void {
    this.router.navigate(['/chatform'], {
      state: { user: this.user }
    });
  }

  onClick(e: Event): void {
    this.chatBtnDisabled = false;
    this.interestBtnDisabled = true;
    this.intrestButton = 'Interest Shared';

    // Direct alert
    alert('Interest Shared Successfully');

    // Email verification
    const form = document.getElementById('interestForm') as HTMLFormElement;
    emailjs.sendForm('service_xdhm3kh', 'template_bxh2d2o', form, 'qCZy92jd7N4N2FgGS')
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error: EmailJSResponseStatus) => {
          console.log('FAILED...', error.text);
          console.log('Form Data:', form);
          console.log('Recipient Address:', 'recipient@example.com'); 
        }
      );
  }
}
