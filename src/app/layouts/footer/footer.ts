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

  contactPhone = '+1 (555) 012-3456';
  contactEmail = 'hello@Siddhartha Caferestaurant.com';
  address = '24 Culinary Avenue, New York, NY 10001';

  navLinks: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Menu', path: '/menu' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  socials: Social[] = [
    { name: 'Instagram', url: 'https://instagram.com', icon: 'bi-instagram' },
    { name: 'Facebook', url: 'https://facebook.com', icon: 'bi-facebook' },
    { name: 'Twitter/X', url: 'https://x.com', icon: 'bi-twitter-x' },
    { name: 'YouTube', url: 'https://youtube.com', icon: 'bi-youtube' },
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
