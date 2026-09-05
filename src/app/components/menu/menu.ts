import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MenuItem } from './service/menu.modal';
import { MenuService } from './service/menu.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss'],
  imports: [CommonModule, FormsModule],
})
export class Menu implements OnInit, AfterViewInit, OnDestroy {
  allMenuItems: MenuItem[] = [];
  activeCategory = 'All';
  activeDietary: 'all' | 'veg' | 'non-veg' = 'all';
  currentPage = 1;
  searchTerm = '';
  readonly itemsPerPage = 6;
  readonly maxPopularItems = 8;

  heroTitle = 'Our Menu';
  heroImage =
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80';

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getMenuItems().subscribe((items) => {
      this.allMenuItems = items;
    });
  }

  @ViewChild('popularScroll') popularScroll?: ElementRef<HTMLDivElement>;
  @ViewChildren('popularCardRef')
  popularCardRefs?: QueryList<ElementRef<HTMLDivElement>>;

  popularActiveIndex = 0;
  private carouselTimer?: ReturnType<typeof setInterval>;
  private readonly carouselIntervalMs = 3000;

  ngAfterViewInit(): void {
    setTimeout(() => this.centerActiveCard(), 0);
    this.startCarousel();
  }

  ngOnDestroy(): void {
    this.stopCarousel();
  }

  startCarousel(): void {
    this.stopCarousel();
    this.carouselTimer = setInterval(
      () => this.nextPopular(),
      this.carouselIntervalMs,
    );
  }

  stopCarousel(): void {
    if (this.carouselTimer) {
      clearInterval(this.carouselTimer);
      this.carouselTimer = undefined;
    }
  }

  pauseCarousel(): void {
    this.stopCarousel();
  }

  resumeCarousel(): void {
    this.startCarousel();
  }

  nextPopular(): void {
    const len = this.popularItems.length;
    if (!len) return;
    this.popularActiveIndex = (this.popularActiveIndex + 1) % len;
    this.centerActiveCard();
  }

  prevPopular(): void {
    const len = this.popularItems.length;
    if (!len) return;
    this.popularActiveIndex = (this.popularActiveIndex - 1 + len) % len;
    this.centerActiveCard();
  }

  setActivePopular(i: number): void {
    this.popularActiveIndex = i;
    this.centerActiveCard();
  }

  popularDistance(i: number): number {
    const len = this.popularItems.length;
    if (!len) return 99;
    const diff = Math.abs(i - this.popularActiveIndex);
    return Math.min(diff, len - diff);
  }

  private centerActiveCard(): void {
    const container = this.popularScroll?.nativeElement;
    const card =
      this.popularCardRefs?.toArray()[this.popularActiveIndex]?.nativeElement;
    if (!container || !card) return;

    const targetScrollLeft =
      card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;

    container.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth',
    });
  }

  get menuCategories(): string[] {
    return ['All', ...new Set(this.allMenuItems.map((i) => i.category))];
  }

  get popularItems(): MenuItem[] {
    return this.allMenuItems
      .filter((item) => item.popular)
      .slice(0, this.maxPopularItems);
  }

  get filteredMenuItems(): MenuItem[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.allMenuItems.filter((item) => {
      const catMatch =
        this.activeCategory === 'All' || item.category === this.activeCategory;
      const dietMatch =
        this.activeDietary === 'all' || item.dietary === this.activeDietary;
      const searchMatch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term);
      return catMatch && dietMatch && searchMatch;
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

  onSearchChange(): void {
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    document
      .getElementById('menu')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  jumpToItem(item: MenuItem): void {
    this.searchTerm = '';
    this.activeCategory = item.category;
    this.activeDietary = 'all';
    const index = this.filteredIndexOf(item);
    this.currentPage = Math.floor(index / this.itemsPerPage) + 1;
    document
      .getElementById('menu')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private filteredIndexOf(item: MenuItem): number {
    const index = this.allMenuItems
      .filter((i) => i.category === item.category)
      .findIndex((i) => i.id === item.id);
    return index === -1 ? 0 : index;
  }

  trackById(_: number, item: MenuItem): string {
    return item.id;
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
