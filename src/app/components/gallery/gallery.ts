import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.scss'],
  imports: [CommonModule],
})
export class Gallery {
  heroTitle = 'Our Gallery';
  heroSubtitle =
    'A glimpse into the moments, flavours, and stories that make us who we are.';
  heroImage =
    'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1600&q=80';

  activeCategory = 'All';
  currentPage = 1;
  readonly itemsPerPage = 10;

  galleryCategories: string[] = [
    'All',
    'Dining',
    'Kitchen',
    'Dishes',
    'Events',
  ];

  galleryImages: GalleryImage[] = [
    {
      src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
      alt: 'Dining room ambiance',
      category: 'Dining',
    },
    {
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      alt: 'Chef plating a dish',
      category: 'Kitchen',
    },
    {
      src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
      alt: 'Pasta dish close-up',
      category: 'Dishes',
    },
    {
      src: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=800&q=80',
      alt: 'Wine selection',
      category: 'Dining',
    },
    {
      src: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&q=80',
      alt: 'Private dining setup',
      category: 'Events',
    },
    {
      src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80',
      alt: 'Dessert plating',
      category: 'Dishes',
    },
    {
      src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
      alt: 'Wagyu steak preparation',
      category: 'Kitchen',
    },
    {
      src: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80',
      alt: 'Saffron risotto',
      category: 'Dishes',
    },
    {
      src: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
      alt: 'Wine cellar',
      category: 'Dining',
    },
    {
      src: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80',
      alt: 'Kitchen prep station',
      category: 'Kitchen',
    },
    {
      src: 'https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=800&q=80',
      alt: 'Truffle harvest table',
      category: 'Events',
    },
    {
      src: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80',
      alt: 'Tiramisu plating',
      category: 'Dishes',
    },
    {
      src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80',
      alt: 'Chef at work',
      category: 'Kitchen',
    },
    {
      src: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80',
      alt: 'Branzino al forno',
      category: 'Dishes',
    },
    {
      src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=80',
      alt: 'Candlelit dinner event',
      category: 'Events',
    },
    {
      src: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=800&q=80',
      alt: 'Truffle arancini',
      category: 'Dishes',
    },
    {
      src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
      alt: 'Osso buco plating',
      category: 'Dishes',
    },
    {
      src: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80',
      alt: 'Restaurant bar area',
      category: 'Dining',
    },
  ];

  lightboxOpen = false;
  lightboxIndex = 0;

  get filteredGalleryImages(): GalleryImage[] {
    if (this.activeCategory === 'All') return this.galleryImages;
    return this.galleryImages.filter(
      (img) => img.category === this.activeCategory,
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredGalleryImages.length / this.itemsPerPage);
  }

  get pagedGalleryImages(): GalleryImage[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredGalleryImages.slice(start, start + this.itemsPerPage);
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

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    document
      .getElementById('gallery')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  openLightbox(index: number): void {
    const globalIndex = (this.currentPage - 1) * this.itemsPerPage + index;
    this.lightboxIndex = globalIndex;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
    document.body.style.overflow = '';
  }

  nextImage(): void {
    this.lightboxIndex =
      (this.lightboxIndex + 1) % this.filteredGalleryImages.length;
  }

  prevImage(): void {
    this.lightboxIndex =
      (this.lightboxIndex - 1 + this.filteredGalleryImages.length) %
      this.filteredGalleryImages.length;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (!this.lightboxOpen) return;
    if (event.key === 'Escape') this.closeLightbox();
    else if (event.key === 'ArrowRight') this.nextImage();
    else if (event.key === 'ArrowLeft') this.prevImage();
  }
}
