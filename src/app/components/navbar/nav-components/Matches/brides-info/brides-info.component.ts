import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../../../navbar.component';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';


@Component({
  selector: 'app-brides-info',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NavbarComponent],
  templateUrl: './brides-info.component.html',
  styleUrls: ['./brides-info.component.css']
})
export class BridesInfoComponent implements OnInit {
  user!: any;
  loggedInUser: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.user = history.state.user;
    this.loggedInUser = sessionStorage.getItem('loggedInUser');
  }

  chatBtnDisabled = true;
  interestBtnDisabled = false;
  intrestButton = 'Share Interest';

  OnChatClick() {
    this.router.navigate(['/chatform'], {
      state: { user: this.user }
    });
  }

  onClick(e: Event) {
    this.chatBtnDisabled = false;
    this.interestBtnDisabled = true;
    this.intrestButton = 'Interest Shared';

    alert('Interest Shared Successfully');

    // Email verification
    const form = document.getElementById('interestForm') as HTMLFormElement;
    emailjs
      .sendForm('service_xdhm3kh', 'template_bxh2d2o', form, 'qCZy92jd7N4N2FgGS')
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
