import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter } from 'rxjs';
import { ReservationModalComponent } from '../../shared/reservation/reservation';

interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ReservationModalComponent,
  ],
})
export class HeaderComponent implements OnInit {
  @ViewChild(ReservationModalComponent)
  reservationModal!: ReservationModalComponent;

  isScrolled = false;
  navOpen = false;
  isBrowser: boolean;

  navLinks: NavLink[] = [
    { label: 'Home', path: '/home' },
    { label: 'About', path: '/about' },
    { label: 'Menu', path: '/menu' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.updateNavbarState();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.navOpen = false;
        this.updateNavbarState();
      });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!this.isBrowser) return;
    const isHome = this.router.url === '/' || this.router.url === '/home';
    this.isScrolled = isHome ? window.scrollY > 60 : true;
  }

  private updateNavbarState(): void {
    const isHome = this.router.url === '/' || this.router.url === '/home';
    const scrollY = this.isBrowser ? window.scrollY : 0;
    this.isScrolled = !isHome || scrollY > 60;
  }

  toggleNav(): void {
    this.navOpen = !this.navOpen;
  }

  closeNav(): void {
    this.navOpen = false;
  }

  openReservation(): void {
    this.reservationModal.open();
  }
}
