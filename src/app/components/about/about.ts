import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ReservationModalComponent } from '../../shared/reservation/reservation';
import { RouterLink } from '@angular/router';

declare var bootstrap: any;

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface ServiceStat {
  icon: string;
  value: string;
  label: string;
}

interface ServiceInclusion {
  icon: string;
  label: string;
}

interface Service {
  icon: string;
  title: string;
  description: string;
  isMenu?: boolean;
  image?: string;
  tagline?: string;
  stats?: ServiceStat[];
  idealFor?: string[];
  inclusions?: ServiceInclusion[];
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

interface Stat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html',
  styleUrls: ['./about.scss'],
  imports: [CommonModule, RouterLink, ReservationModalComponent],
})
export class About {
  @ViewChild(ReservationModalComponent)
  reservationModal!: ReservationModalComponent;

  @ViewChild('serviceModal') serviceModalRef!: ElementRef;

  selectedService: Service | null = null;

  heroTitle = 'About Us';
  heroSubtitle =
    'A glimpse into the passion, craftsmanship, and people that make every meal an experience.';
  heroImage =
    'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1600&q=80';

  foundedYear = '2025';
  storyImage =
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80';

  storyTitle = 'Our Story';
  storyBody = [
    'Rooted in a love for Nepal s rich culinary heritage and warm hospitality, Siddhartha Cafe and Restro brings together authentic Nepali flavors and modern dining. Inspired by the diverse tastes and traditions of Nepal, we create a welcoming space where every meal feels familiar, fresh, and memorable.',
    'Every dish is thoughtfully prepared with quality ingredients, traditional flavors, and a touch of creativity. From beloved Nepali classics to modern café favorites, our menu celebrates the stories, culture, and warmth of Nepal bringing people together, one delicious meal at a time.',
  ];

  features: string[] = [
    'Locally sourced, seasonal ingredients',
    'Award-winning sommelier-curated wine list',
    'Private dining for up to 40 guests',
    'Handmade pasta crafted fresh daily',
  ];

  stats: Stat[] = [
    { value: '2+', label: 'Years of Excellence' },
    { value: '12', label: 'Culinary Awards' },
    { value: '200+', label: 'Drinks on List' },
    { value: '12k+', label: 'Happy Guests / Year' },
  ];

  services: Service[] = [
    {
      icon: 'bi-cup-hot',
      title: 'Restaurant / Café',
      description:
        'Relax at Siddhartha Café with authentic Nepali flavours, continental favourites, and locally sourced ingredients served with warmth.',
      isMenu: true,
    },
    {
      icon: 'bi-building',
      title: 'Siddhartha Palace Banquet',
      description:
        'Spacious and elegant banquet halls designed to make every wedding, reception, and celebration truly memorable.',
      isMenu: false,
      image: 'assets/image/hero1.png',
      tagline:
        'Two grand halls crafted for celebrations that deserve the best.',
      stats: [
        { icon: 'bi-door-open', value: '2', label: 'Halls' },
        { icon: 'bi-people', value: '500+', label: 'Capacity' },
        { icon: 'bi-grid', value: '5,000', label: 'Sq Ft' },
      ],
      idealFor: [
        'Weddings',
        'Receptions',
        'Birthdays',
        'Corporate',
        'Cultural',
      ],
      inclusions: [
        { icon: 'bi-stars', label: 'Decor Setup (Minimal)' },
        { icon: 'bi-cup-straw', label: 'Tea/Coffee' },
        { icon: 'bi-mic', label: 'Stage & Sound' },
        { icon: 'bi-person-check', label: 'Service Staff' },
      ],
    },
    {
      icon: 'bi-truck',
      title: 'Outdoor Catering',
      description:
        'Delicious, freshly prepared catering for weddings, celebrations, corporate events, and special occasions across the Valley.',
      isMenu: false,
      image: 'assets/image/catering1.jpg',
      tagline: 'Restaurant-quality feasts at any venue you choose.',
      stats: [
        { icon: 'bi-geo-alt', value: 'Valley-wide', label: 'Coverage' },
        { icon: 'bi-house-heart', label: 'Any Venue', value: 'Any Venue' },
        { icon: 'bi-box-seam', value: 'Full', label: 'Setup Included' },
      ],
      idealFor: [
        'Garden Weddings',
        'Corporate Retreats',
        'Ceremonies',
        'Gatherings',
      ],
      inclusions: [
        { icon: 'bi-fire', label: 'Live Cooking' },
        { icon: 'bi-layout-split', label: 'Display Counters' },
        { icon: 'bi-person-check', label: 'Service Staff' },
        { icon: 'bi-truck', label: 'Transport' },
      ],
    },
  ];

  testimonials: Testimonial[] = [
    {
      quote:
        'Perhaps the most romantic restaurant in the city. The truffle risotto alone is worth the trip across the country.',
      author: 'Mark Stone',
      role: 'Food Critic, The Daily Table',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
    },
    {
      quote:
        'Seafood done with precision and heart. Every visit feels like the first — that is an incredibly rare thing.',
      author: 'Michael Thomas',
      role: 'Executive Chef & Author',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80',
    },
  ];

  team: TeamMember[] = [
    {
      name: 'Marco Bellini',
      role: 'Executive Chef',
      image:
        'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80',
      bio: '3 Michelin stars, 20 years of culinary mastery across Italy and France.',
    },
    {
      name: 'Sophia Laurent',
      role: 'Head Sommelier',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      bio: 'Master of Wine with an encyclopaedic knowledge of Italian vintages.',
    },
    {
      name: 'James Carver',
      role: 'Pastry Chef',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
      bio: 'Award-winning pastry artisan who trained under the best in Paris.',
    },
    {
      name: 'Elena Rossi',
      role: 'Restaurant Manager',
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
      bio: 'Fifteen years of front-of-house excellence with warmth and precision.',
    },
  ];

  chefSignatureImage =
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80';

  openServiceModal(svc: Service): void {
    this.selectedService = svc;
    const modalEl = document.getElementById('serviceDetailModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  openReservation(): void {
    this.reservationModal.open();
  }
}
