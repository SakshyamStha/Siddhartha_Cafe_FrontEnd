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
  dietary: 'veg' | 'non-veg';
  badge?: string;
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

  heroSlides = [
    {
      src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1600&q=80',
      alt: 'Restaurant ambiance',
    },
    {
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80',
      alt: 'Chef plating a dish',
    },
    {
      src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80',
      alt: 'Signature dish',
    },
    {
      src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1600&q=80',
      alt: 'Pasta close-up',
    },
  ];

  activeSlide = 0;
  slideInterval = 5000;
  private slideTimer: ReturnType<typeof setInterval> | null = null;

  startSlideshow(): void {
    this.slideTimer = setInterval(() => {
      this.activeSlide = (this.activeSlide + 1) % this.heroSlides.length;
    }, this.slideInterval);
  }

  goToSlide(index: number): void {
    this.activeSlide = index;
    // Reset the timer so the new slide gets a full interval
    if (this.slideTimer) {
      clearInterval(this.slideTimer);
    }
    this.startSlideshow();
  }

  ngOnDestroy(): void {
    if (this.slideTimer) clearInterval(this.slideTimer);
  }

  about: About = {
    heading: 'Where Every Bite Tells a Story',
    body: `Founded in 2025, Siddhartha Cafe has been serving contemporary Nepalese cuisine
           crafted from the finest locally sourced ingredients. Our philosophy is simple:
           respect the ingredient, honor the tradition, and surprise the palate.`,
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80',
    imageAlt: 'Restaurant interior ambiance',
    yearsOpen: 2,
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
        'Crispy risotto balls filled with black truffle and fontina, served with aioli.',
      price: 180,
      image:
        'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=500&q=80',
      category: 'Starters',
      dietary: 'veg',
      badge: 'Chefs Pick',
    },
    {
      name: 'Burrata & Heirloom Tomato',
      description:
        'Creamy burrata with heirloom tomatoes, basil oil, and aged balsamic.',
      price: 220,
      image:
        'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=500&q=80',
      category: 'Starters',
      dietary: 'veg',
    },
    {
      name: 'Saffron Risotto',
      description:
        'Classic Milanese risotto with aged Parmigiano-Reggiano and gold leaf.',
      price: 340,
      image:
        'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&q=80',
      category: 'Mains',
      dietary: 'veg',
      badge: 'Signature',
    },
    {
      name: 'Branzino al Forno',
      description:
        'Whole roasted sea bass with capers, lemon butter, and herb gremolata.',
      price: 460,
      image:
        'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80',
      category: 'Mains',
      dietary: 'non-veg',
    },
    {
      name: 'Wagyu Tagliata',
      description:
        'Sliced A5 Wagyu striploin with rocket, truffle shavings, and Pecorino.',
      price: 720,
      image:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80',
      category: 'Mains',
      dietary: 'non-veg',
      badge: 'Premium',
    },
    {
      name: 'Tiramisu della Casa',
      description:
        'House-made tiramisu with espresso-soaked savoiardi and mascarpone cream.',
      price: 140,
      image:
        'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80',
      category: 'Desserts',
      dietary: 'veg',
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
      name: 'Ramhari Pathak',
      location: 'Chabahil, Kathmandu',
      body: 'Hands down the finest Siddhartha Cafe Ive had outside of Chabahil. The service is impeccable and the ambiance absolutely divine.',
      avatar: 'https://i.pravatar.cc/80?img=47',
    },
    {
      name: 'Sita Sharma',
      location: 'Ratnapark, Kathmandu',
      body: 'We celebrated our anniversary here and it was perfect in every way — the tasting menu paired beautifully with the sommeliers recommendations.',
      avatar: 'https://i.pravatar.cc/80?img=12',
    },
    {
      name: 'Sunita Thapa',
      location: 'Patan, Lalitpur',
      body: 'The Wagyu tagliata melted in my mouth. A truly world-class kitchen with warmth and personality thats rare to find.',
      avatar: 'https://i.pravatar.cc/80?img=32',
    },
  ];

  contactPhone = '9841123321';

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.startSlideshow();
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

  lightboxImages: { src: string; alt: string }[] = [];

  openMenuLightbox(items: MenuItem[], index: number): void {
    this.lightboxImages = items.map((i) => ({ src: i.image, alt: i.name }));
    this.lightboxIndex = index;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  openLightbox(index: number): void {
    this.lightboxImages = this.galleryImages;
    this.lightboxIndex = index;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }
  closeLightbox(): void {
    this.lightboxOpen = false;
    document.body.style.overflow = '';
  }

  nextImage(): void {
    this.lightboxIndex = (this.lightboxIndex + 1) % this.lightboxImages.length;
  }

  prevImage(): void {
    this.lightboxIndex =
      (this.lightboxIndex - 1 + this.lightboxImages.length) %
      this.lightboxImages.length;
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
