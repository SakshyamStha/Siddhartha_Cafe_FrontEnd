import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../api- configs/api-endpoints';

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
export class Gallery implements OnInit {
  private http = inject(HttpClient);

  heroTitle = 'Our Gallery';
  heroSubtitle =
    'A glimpse into the moments, flavours, and stories that make us who we are.';
  heroImage =
    'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1600&q=80';

  activeCategory = 'All';
  currentPage = 1;
  readonly itemsPerPage = 10;

  galleryCategories: string[] = ['All'];
  galleryImages: GalleryImage[] = [];
  loading = true;

  ngOnInit(): void {
    this.http.get<GalleryImage[]>(API_ENDPOINTS.GALLERY_LIST).subscribe({
      next: (images) => {
        this.galleryImages = images.map((img) => ({
          ...img,
          src: img.src.startsWith('http')
            ? img.src
            : `http://localhost:3000${img.src}`,
        }));

        const uniqueCategories = Array.from(
          new Set(this.galleryImages.map((i) => i.category)),
        );
        this.galleryCategories = ['All', ...uniqueCategories];

        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load gallery images', err);
        this.loading = false;
      },
    });
  }

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