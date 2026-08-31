import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  dietary: 'veg' | 'non-veg';
  badge?: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss'],
  imports: [CommonModule],
})
export class Menu {
  activeCategory = 'All';
  activeDietary: 'all' | 'veg' | 'non-veg' = 'all';
  currentPage = 1;
  readonly itemsPerPage = 6;

  heroTitle = 'Our Menu';
  heroImage =
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80';

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
      name: 'Carpaccio di Manzo',
      description:
        'Thinly sliced beef tenderloin with capers, arugula, and shaved Parmigiano.',
      price: 240,
      image:
        'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=500&q=80',
      category: 'Starters',
      dietary: 'non-veg',
    },
    {
      name: 'Roasted Beet Salad',
      description:
        'Golden and red beets with whipped goat cheese, candied walnuts, and citrus.',
      price: 190,
      image:
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80',
      category: 'Starters',
      dietary: 'veg',
    },
    {
      name: 'Calamari Fritti',
      description:
        'Lightly fried calamari with a spicy pomodoro dipping sauce and lemon.',
      price: 210,
      image:
        'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500&q=80',
      category: 'Starters',
      dietary: 'non-veg',
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
      name: 'Tagliatelle al Ragù',
      description:
        'House-made tagliatelle with a slow-braised beef and pork ragù.',
      price: 290,
      image:
        'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=80',
      category: 'Mains',
      dietary: 'non-veg',
    },
    {
      name: 'Osso Buco alla Milanese',
      description:
        'Braised veal shank with saffron risotto and a rich gremolata finish.',
      price: 540,
      image:
        'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80',
      category: 'Mains',
      dietary: 'non-veg',
      badge: 'Chefs Pick',
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
    {
      name: 'Panna Cotta al Limone',
      description:
        'Silky lemon panna cotta with a wild berry compote and mint.',
      price: 130,
      image:
        'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&q=80',
      category: 'Desserts',
      dietary: 'veg',
    },
    {
      name: 'Flourless Chocolate Torte',
      description:
        'Dense dark chocolate torte with hazelnut praline and gold leaf.',
      price: 150,
      image:
        'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&q=80',
      category: 'Desserts',
      dietary: 'veg',
      badge: 'Chefs Pick',
    },
    {
      name: 'Affogato al Caffè',
      description:
        'Vanilla gelato drowned in a shot of hot espresso, served tableside.',
      price: 110,
      image:
        'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&q=80',
      category: 'Desserts',
      dietary: 'veg',
    },
    {
      name: 'Negroni Classico',
      description: 'Gin, Campari, and sweet vermouth stirred over ice.',
      price: 160,
      image:
        'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&q=80',
      category: 'Drinks',
      dietary: 'veg',
    },
    {
      name: 'Aperol Spritz',
      description:
        'Aperol, prosecco, and soda water with a fresh orange slice.',
      price: 140,
      image:
        'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=500&q=80',
      category: 'Drinks',
      dietary: 'veg',
      badge: 'Popular',
    },
    {
      name: 'Barolo DOCG',
      description:
        'Full-bodied red from Piedmont, aged three years in oak, glass or bottle.',
      price: 220,
      image:
        'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&q=80',
      category: 'Drinks',
      dietary: 'veg',
    },
  ];

  get filteredMenuItems(): MenuItem[] {
    return this.menuItems.filter((item) => {
      const catMatch =
        this.activeCategory === 'All' || item.category === this.activeCategory;
      const dietMatch =
        this.activeDietary === 'all' || item.dietary === this.activeDietary;
      return catMatch && dietMatch;
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredMenuItems.length / this.itemsPerPage);
  }

  get pagedMenuItems(): MenuItem[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredMenuItems.slice(start, start + this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const pages: number[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }

    pages.push(1);
    if (current > 3) pages.push(-1);
    for (
      let i = Math.max(2, current - 1);
      i <= Math.min(total - 1, current + 1);
      i++
    ) {
      pages.push(i);
    }
    if (current < total - 2) pages.push(-1);
    pages.push(total);
    return pages;
  }

  setCategory(cat: string): void {
    this.activeCategory = cat;
    this.currentPage = 1;
  }

  setDietary(dietary: 'all' | 'veg' | 'non-veg'): void {
    this.activeDietary = dietary;
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    document
      .getElementById('menu')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  lightboxOpen = false;
  lightboxIndex = 0;
  lightboxImages: { src: string; alt: string }[] = [];

  openMenuLightbox(index: number): void {
    this.lightboxImages = this.filteredMenuItems.map((i) => ({
      src: i.image,
      alt: i.name,
    }));
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
    if (!this.lightboxOpen) return;
    if (event.key === 'Escape') this.closeLightbox();
    else if (event.key === 'ArrowRight') this.nextImage();
    else if (event.key === 'ArrowLeft') this.prevImage();
  }
}
