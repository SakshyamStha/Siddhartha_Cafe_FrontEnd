import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ReservationModalComponent } from '../../shared/reservation/reservation';
import { RouterLink } from '@angular/router';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface Service {
  icon: string;
  title: string;
  description: string;
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
    'Rooted in a love for Nepal’s rich culinary heritage and warm hospitality, Siddhartha Cafe and Restro brings together authentic Nepali flavors and modern dining. Inspired by the diverse tastes and traditions of Nepal, we create a welcoming space where every meal feels familiar, fresh, and memorable.',
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
      title: 'Fine Dining',
      description:
        'An intimate, candlelit experience where every course is a deliberate act of hospitality and craft.',
    },
    {
      icon: 'bi-bag-heart',
      title: 'Private Events',
      description:
        'From intimate anniversaries to corporate soirées, our team curates every detail so you can simply savour the moment.',
    },
    {
      icon: 'bi-shop',
      title: 'Wine Bar',
      description:
        'Over 200 labels from boutique  producers, served with small plates in our relaxed cellar bar downstairs.',
    },
    {
      icon: 'bi-mortarboard',
      title: 'Cooking Classes',
      description:
        'Learn the art of handmade pasta, risotto, and more from our head chef in our dedicated teaching kitchen.',
    },
    {
      icon: 'bi-truck',
      title: 'Catering',
      description:
        'Restaurant-quality cuisine delivered to your venue — weddings, launches, or a luxurious garden party.',
    },
    {
      icon: 'bi-gift',
      title: 'Gift Experiences',
      description:
        'Give the gift of a memorable meal. Our experience vouchers are the perfect gesture for any occasion.',
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

  openReservation(): void {
    this.reservationModal.open();
  }
}
