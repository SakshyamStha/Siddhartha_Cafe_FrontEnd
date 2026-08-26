import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface NavLink {
  label: string;
  path: string;
}

interface Social {
  name: string;
  url: string;
  icon: string;
}

interface Hours {
  day: string;
  time: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  newsletterEmail = '';

  contactPhone = '+9841123322';
  contactEmail = 'hello@sidcafe.com';
  address = 'Thulovaryang, Kathmandu, Nepal';

  navLinks: NavLink[] = [
    { label: 'Home', path: '/home' },
    { label: 'About', path: '/about' },
    { label: 'Menu', path: '/menu' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ];

  socials: Social[] = [
    { name: 'Instagram', url: 'https://instagram.com', icon: 'fa-instagram' },
    { name: 'Facebook', url: 'https://facebook.com', icon: 'fa-facebook' },
    { name: 'Twitter/X', url: 'https://x.com', icon: 'fa-twitter' },
    { name: 'YouTube', url: 'https://youtube.com', icon: 'fa-youtube' },
  ];

  hours: Hours[] = [
    { day: 'Mon – Fri', time: '12:00 – 22:30' },
    { day: 'Saturday', time: '11:00 – 23:00' },
    { day: 'Sunday', time: '11:00 – 21:00' },
  ];

  subscribeNewsletter(): void {
    if (!this.newsletterEmail || !this.newsletterEmail.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    console.log('Subscribed:', this.newsletterEmail);
    this.newsletterEmail = '';
    alert('Thank you for subscribing!');
  }
}
