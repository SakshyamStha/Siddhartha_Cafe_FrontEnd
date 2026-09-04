import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../api- configs/api-endpoints';

type DietaryFilter = 'all' | 'veg' | 'non-veg';
type DrinkFilter = 'all' | 'Hot' | 'Cold' | 'Hard Drinks';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  dietary: 'veg' | 'non-veg';
  badge?: string;
  drinkType?: 'Hot' | 'Cold' | 'Hard Drinks';
}

interface ApiMenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  badge: string | null;
  tags: string[];
}

const DRINK_ORDER: Record<string, number> = {
  Hot: 1,
  Cold: 2,
  'Hard Drinks': 3,
};

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss'],
  imports: [CommonModule],
})
export class Menu implements OnInit {
  private http = inject(HttpClient);

  activeCategory = 'All';
  activeDietary: DietaryFilter = 'all';
  activeDrinkFilter: DrinkFilter = 'all';
  currentPage = 1;
  readonly itemsPerPage = 6;

  heroTitle = 'Our Menu';
  heroImage =
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80';

  menuCategories: string[] = ['All'];
  menuItems: MenuItem[] = [];
  loading = true;

  ngOnInit(): void {
    this.http.get<ApiMenuItem[]>(API_ENDPOINTS.MENU_LIST).subscribe({
      next: (items) => {
        this.menuItems = items.map((item) => {
          const isDrink = item.category.trim().toLowerCase() === 'drinks';
          const drinkTypeTags: MenuItem['drinkType'][] = ['Hot', 'Cold', 'Hard Drinks'];
          const matchedDrinkType = drinkTypeTags.find((t) => item.tags.includes(t as string));

          return {
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image.startsWith('http')
              ? item.image
              : `http://localhost:3000${item.image}`,
            category: item.category,
            dietary: item.tags.includes('Non-Veg') ? 'non-veg' : 'veg',
            badge: item.badge || undefined,
            drinkType: isDrink ? matchedDrinkType : undefined,
          };
        });

        const uniqueCategories = Array.from(
          new Set(items.map((i) => i.category)),
        );
        this.menuCategories = ['All', ...uniqueCategories];

        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load menu items', err);
        this.loading = false;
      },
    });
  }

  get isDrinksCategory(): boolean {
    return this.activeCategory.trim().toLowerCase() === 'drinks';
  }

  get filteredMenuItems(): MenuItem[] {
    let items = this.menuItems.filter((item) => {
      const catMatch =
        this.activeCategory === 'All' || item.category === this.activeCategory;
      return catMatch;
    });

    if (this.isDrinksCategory) {
      if (this.activeDrinkFilter !== 'all') {
        items = items.filter((item) => item.drinkType === this.activeDrinkFilter);
      }
      items = [...items].sort(
        (a, b) => (DRINK_ORDER[a.drinkType || ''] || 99) - (DRINK_ORDER[b.drinkType || ''] || 99),
      );
    } else {
      if (this.activeDietary !== 'all') {
        items = items.filter((item) => item.dietary === this.activeDietary);
      }
    }

    return items;
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
    this.activeDietary = 'all';
    this.activeDrinkFilter = 'all';
    this.currentPage = 1;
  }

  setDietary(dietary: DietaryFilter): void {
    this.activeDietary = dietary;
    this.currentPage = 1;
  }

  setDrinkFilter(filter: DrinkFilter): void {
    this.activeDrinkFilter = filter;
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    document
      .getElementById('menu')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  drinkTypeColor(type?: string): string {
    switch (type) {
      case 'Hot':
        return '#c2410c';
      case 'Cold':
        return '#1d4ed8';
      case 'Hard Drinks':
        return '#7e22ce';
      default:
        return '#6b7280';
    }
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