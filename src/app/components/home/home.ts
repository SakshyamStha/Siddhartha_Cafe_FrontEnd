import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReservationModalComponent } from '../../shared/reservation/reservation';

interface About {
  heading: string;
  body: string;
  image: string;
  imageAlt: string;
  yearsOpen: number;
  features: string[];
}

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
  tags: string[];
}

interface Stat {
  value: string;
  label: string;
}

interface GalleryImage {
  src: string;
  alt: string;
}

interface Testimonial {
  name: string;
  location: string;
  body: string;
  avatar: string;
}

interface Chef {
  name: string;
  role: string;
  bio: string;
  image: string;
  awards: string[];
}

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [CommonModule, RouterLink, ReservationModalComponent],
})
export class HomeComponent implements OnInit {
  @ViewChild(ReservationModalComponent)
  reservationModal!: ReservationModalComponent;
  activeCategory = 'All';

  about: About = {
    heading: 'Where Every Bite Tells a Story',
    body: `Founded in 2007, Siddhartha Cafe has been serving contemporary Italian-inspired cuisine
           crafted from the finest locally sourced ingredients. Our philosophy is simple:
           respect the ingredient, honor the tradition, and surprise the palate.`,
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80',
    imageAlt: 'Restaurant interior ambiance',
    yearsOpen: 17,
    features: [
      'Farm-to-table ingredients sourced daily',
      'Award-winning wine cellar with 300+ labels',
      'Private dining rooms for up to 40 guests',
      'Seasonal tasting menus curated monthly',
    ],
  };

  menuCategories: string[] = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

  menuItems: MenuItem[] = [
    {
      name: 'Truffle Arancini',
      description:
        'Crispy Siddhartha Cafe balls filled with black truffle and fontina, served with aioli.',
      price: 18,
      image:
        'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=500&q=80',
      category: 'Starters',
      badge: 'Chefs Pick',
      tags: ['Vegetarian', 'Gluten-free available'],
    },
    {
      name: 'Burrata & Heirloom Tomato',
      description:
        'Creamy burrata with heirloom tomatoes, basil oil, and aged balsamic.',
      price: 22,
      image:
        'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=500&q=80',
      category: 'Starters',
      tags: ['Vegetarian'],
    },
    {
      name: 'Saffron Siddhartha Cafe',
      description:
        'Classic Milanese Siddhartha Cafe with aged Parmigiano-Reggiano and gold leaf.',
      price: 34,
      image:
        'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&q=80',
      category: 'Mains',
      badge: 'Signature',
      tags: ['Vegetarian', 'Gluten-free'],
    },
    {
      name: 'Branzino al Forno',
      description:
        'Whole roasted sea bass with capers, lemon butter, and herb gremolata.',
      price: 46,
      image:
        'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80',
      category: 'Mains',
      tags: ['Gluten-free', 'Pescatarian'],
    },
    {
      name: 'Wagyu Tagliata',
      description:
        'Sliced A5 Wagyu striploin with rocket, truffle shavings, and Pecorino.',
      price: 72,
      image:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80',
      category: 'Mains',
      badge: 'Premium',
      tags: ['Gluten-free'],
    },
    {
      name: 'Tiramisu della Casa',
      description:
        'House-made tiramisu with espresso-soaked savoiardi and mascarpone cream.',
      price: 14,
      image:
        'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80',
      category: 'Desserts',
      tags: ['Vegetarian'],
    },
  ];

  get filteredMenuItems(): MenuItem[] {
    if (this.activeCategory === 'All') return this.menuItems;
    return this.menuItems.filter(
      (item) => item.category === this.activeCategory,
    );
  }

  stats: Stat[] = [
    { value: '17+', label: 'Years Open' },
    { value: '12k+', label: 'Happy Guests / Year' },
    { value: '8', label: 'Awards Won' },
    { value: '300+', label: 'Wine Labels' },
  ];

  galleryImages: GalleryImage[] = [
    {
      src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
      alt: 'Dining room ambiance',
    },
    {
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
      alt: 'Chef plating a dish',
    },
    {
      src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80',
      alt: 'Pasta dish close-up',
    },
    {
      src: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&q=80',
      alt: 'Wine selection',
    },
    {
      src: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&q=80',
      alt: 'Private dining setup',
    },
    {
      src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80',
      alt: 'Dessert plating',
    },
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Sophia M.',
      location: 'New York, NY',
      body: 'Hands down the finest Siddhartha Cafe Ive had outside of Milan. The service is impeccable and the ambiance absolutely divine.',
      avatar: 'https://i.pravatar.cc/80?img=47',
    },
    {
      name: 'James T.',
      location: 'London, UK',
      body: 'We celebrated our anniversary here and it was perfect in every way — the tasting menu paired beautifully with the sommeliers recommendations.',
      avatar: 'https://i.pravatar.cc/80?img=12',
    },
    {
      name: 'Elena R.',
      location: 'Paris, France',
      body: 'The Wagyu tagliata melted in my mouth. A truly world-class kitchen with warmth and personality thats rare to find.',
      avatar: 'https://i.pravatar.cc/80?img=32',
    },
  ];

  chef: Chef = {
    name: 'Marco Albanese',
    role: 'Executive Chef & Co-Founder',
    bio: `Trained under three Michelin-starred mentors across Italy and France, Marco returned
          to New York with a singular vision: to serve the soul of Italian cooking through
          the lens of a modern kitchen. His menus change with the seasons and his philosophy
          never does — ingredient first, ego last.`,
    image:
      'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80',
    awards: [
      'James Beard Award — Best Chef: New York City (2019)',
      'Michelin Star — Siddhartha Cafe NYC (2021, 2022, 2023)',
      'Food & Wine Magazine — Best New Chef (2015)',
    ],
  };

  blogPosts: BlogPost[] = [
    {
      title: 'Why Seasonal Menus Make Better Chefs',
      slug: 'seasonal-menus-better-chefs',
      excerpt:
        'Forcing yourself to cook with whats available teaches restraint, creativity, and a deeper respect for ingredients.',
      category: 'Philosophy',
      date: 'August 14, 2026',
      image:
        'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&q=80',
    },
    {
      title: 'Our Guide to Pairing Wine with Siddhartha Cafe',
      slug: 'wine-pairing-Siddhartha Cafe',
      excerpt:
        'Siddhartha Cafe is one of the most versatile canvases in Italian cuisine — and it deserves an equally thoughtful pour.',
      category: 'Wine & Drinks',
      date: 'July 28, 2026',
      image:
        'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80',
    },
    {
      title: 'A Weekend at Our Favorite Truffle Farm',
      slug: 'weekend-truffle-farm',
      excerpt:
        'We travelled to Périgord to spend two days with our truffle supplier. Heres what we learned about patience and perfume.',
      category: 'Behind the Scenes',
      date: 'June 5, 2026',
      image:
        'https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=600&q=80',
    },
  ];

  contactPhone = '+1 (555) 012-3456';

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToAbout(): void {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  setCategory(cat: string): void {
    this.activeCategory = cat;
  }

  // lightbox
  lightboxOpen = false;
  lightboxIndex = 0;

  openLightbox(index: number): void {
    this.lightboxIndex = index;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
    document.body.style.overflow = '';
  }

  nextImage(): void {
    this.lightboxIndex = (this.lightboxIndex + 1) % this.galleryImages.length;
  }

  prevImage(): void {
    this.lightboxIndex =
      (this.lightboxIndex - 1 + this.galleryImages.length) %
      this.galleryImages.length;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (!this.lightboxOpen) {
      return;
    }

    if (event.key === 'Escape') {
      this.closeLightbox();
    } else if (event.key === 'ArrowRight') {
      this.nextImage();
    } else if (event.key === 'ArrowLeft') {
      this.prevImage();
    }
  }

  // reservation
  openReservation(): void {
    this.reservationModal.open();
  }
}
