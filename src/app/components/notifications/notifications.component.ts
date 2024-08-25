import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/messages/messages';
import { Reply } from '../../models/reply/reply';
import { MessagingService } from '../../services/message/message.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  messages: Reply[] = [];
  filteredMessages: Reply[] = []; // Array to store filtered messages
  isDisabled = false;
  buttonText = 'Confirm';

  constructor(private messagingService: MessagingService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.fetchMessages(); // Fetch messages when the component initializes
  }

  fetchMessages(): void {
    const email = sessionStorage.getItem('loggedInUserEmail');
    if (email) {
      this.messagingService.getAllReply(email).subscribe(
        (messages: Reply[]) => {
          this.messages = messages; // Assign the fetched messages to the messages array
        },
        (error) => {
          console.error('Error fetching messages:', error);
        }
      );
    } else {
      console.error('No email found in session storage');
    }
  }

  onClick() {
    this.isDisabled = true;
    this.buttonText = 'Confirmed';
    alert('Confirmation sent to User');
  }

  closeNotificationBox() {
    this.notificationService.hideNotificationBox();
  }
}
