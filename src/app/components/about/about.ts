import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
  imports: [CommonModule],
})
export class About {
  heroTitle = 'About Us';
  heroSubtitle =
    'A glimpse into the passion, craftsmanship, and people that make every meal an experience.';
  heroImage =
    'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1600&q=80';

  foundedYear = '1994';
  storyImage =
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80';

  storyTitle = 'Our Story';
  storyBody = [
    "Born from a lifelong devotion to Italian cuisine and a relentless pursuit of flavour, our restaurant opened its doors over three decades ago on a quiet cobblestone corner. What began as a family trattoria has grown into one of the city's most celebrated dining destinations — yet our soul remains the same.",
    'Every dish we serve is a conversation between tradition and innovation. We source ingredients with obsessive care, build relationships with farmers and artisans, and train every chef to treat the kitchen as a stage for storytelling.',
  ];

  features: string[] = [
    'Locally sourced, seasonal ingredients',
    'Award-winning sommelier-curated wine list',
    'Private dining for up to 40 guests',
    'Handmade pasta crafted fresh daily',
  ];

  stats: Stat[] = [
    { value: '30+', label: 'Years of Excellence' },
    { value: '18', label: 'Culinary Awards' },
    { value: '200+', label: 'Wines on List' },
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
        'Over 200 labels from boutique Italian producers, served with small plates in our relaxed cellar bar downstairs.',
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
}
