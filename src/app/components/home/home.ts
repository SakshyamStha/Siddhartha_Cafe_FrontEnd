import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReservationModalComponent } from '../../shared/reservation/reservation';
import { WhatsappLinkComponent } from '../../shared/whatsapp-navigation/whatsapp-nav';

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
  imports: [
    CommonModule,
    RouterLink,
    ReservationModalComponent,
    WhatsappLinkComponent,
  ],
})
export class HomeComponent implements OnInit {
  @ViewChild(ReservationModalComponent)
  reservationModal!: ReservationModalComponent;
  activeCategory = 'Popular';

  heroSlides = [
    {
      src: 'assets/image/heroooo.jpg',
      alt: 'Our Cafe',
    },
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

  menuCategories: string[] = [
    'Popular',
    'Tandoor & Kebabs',
    'Curry',
    'Thakali Khana',
    'Pizza',
    'Coffee & Tea',
  ];
  menuItems: MenuItem[] = [
    {
      name: 'Chicken Tikka',
      description:
        'Boneless chicken marinated in yogurt and spices, chargrilled in the tandoor.',
      price: 600,
      image:
        'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80',
      category: 'Tandoor & Kebabs',
      dietary: 'non-veg',
      badge: 'Chefs Pick',
    },
    {
      name: 'Paneer Tikka',
      description:
        'Cottage cheese cubes marinated and grilled with peppers and onions.',
      price: 330,
      image:
        'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&q=80',
      category: 'Tandoor & Kebabs',
      dietary: 'veg',
    },
    {
      name: 'Seekh Kebab (Mutton/Chicken)',
      description:
        'Minced meat skewers seasoned with herbs and spices, cooked over charcoal.',
      price: 950,
      image:
        'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80',
      category: 'Tandoor & Kebabs',
      dietary: 'non-veg',
    },
    {
      name: 'Palak Paneer',
      description:
        'Cottage cheese cubes simmered in a smooth spiced spinach gravy.',
      price: 350,
      image:
        'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80',
      category: 'Curry',
      dietary: 'veg',
    },
    {
      name: 'Chicken Curry',
      description:
        'Traditional home-style chicken curry simmered in onion-tomato gravy.',
      price: 400,
      image: 'assets/image/chickencurry.jpg',
      category: 'Curry',
      dietary: 'non-veg',
    },
    {
      name: 'Mutton Curry',
      description:
        'Slow-cooked mutton curry with a rich blend of traditional spices.',
      price: 650,
      image: 'assets/image/mutton-curry.jfif',
      category: 'Curry',
      dietary: 'non-veg',
    },
    {
      name: 'Chicken Khana Set',
      description:
        'Traditional Thakali thali with rice, chicken curry, lentils, greens and pickle.',
      price: 475,
      image: 'assets/image/nonvegkhana.jpg',
      category: 'Thakali Khana',
      dietary: 'non-veg',
      badge: 'Signature',
    },
    {
      name: 'Veg Khana Set',
      description:
        'Traditional Thakali thali with rice, seasonal vegetables, lentils and pickle.',
      price: 375,
      image: 'assets/image/veg-khana.jpg',
      category: 'Thakali Khana',
      dietary: 'veg',
    },
    {
      name: 'Margherita Pizza',
      description:
        'Classic pizza with tomato sauce, mozzarella and fresh basil.',
      price: 495,
      image:
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80',
      category: 'Pizza',
      dietary: 'veg',
    },
    {
      name: 'Siddhartha Special Pizza',
      description:
        'Loaded pizza with chicken, sausage, ham, salami, bacon, mixed fruits and cashew nut topping.',
      price: 795,
      image:
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80',
      category: 'Pizza',
      dietary: 'non-veg',
      badge: 'Signature',
    },
    {
      name: 'Cappuccino',
      description: 'Espresso with steamed milk and a thick layer of foam.',
      price: 195,
      image:
        'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80',
      category: 'Coffee & Tea',
      dietary: 'veg',
    },
    {
      name: 'Cafe Latte',
      description: 'Smooth espresso balanced with steamed milk.',
      price: 190,
      image:
        'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80',
      category: 'Coffee & Tea',
      dietary: 'veg',
    },
    {
      name: 'Masala Milk Tea',
      description: 'Classic spiced milk tea, brewed strong and fragrant.',
      price: 110,
      image:
        'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500&q=80',
      category: 'Coffee & Tea',
      dietary: 'veg',
    },
    {
      name: 'Strawberry Smoothie',
      description:
        'Blended fresh strawberries with yogurt and a touch of honey.',
      price: 250,
      image:
        'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&q=80',
      category: 'Coffee & Tea',
      dietary: 'veg',
    },
  ];

  get filteredMenuItems(): MenuItem[] {
    if (this.activeCategory === 'Popular') return this.menuItems;
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
      src: 'assets/image/gallery2.jpg',
      alt: 'Pasta dish close-up',
    },
    {
      src: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&q=80',
      alt: 'Wine selection',
    },
    {
      src: 'assets/image/gallery1.jpg',
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

  contactPhone = '9849738096';

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

  @ViewChild('menuTabsRef') menuTabsRef?: ElementRef<HTMLDivElement>;
  onTabsWheel(event: WheelEvent): void {
    const el = this.menuTabsRef?.nativeElement;
    if (!el) return;
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      el.scrollLeft += event.deltaY;
    }
  }
}
