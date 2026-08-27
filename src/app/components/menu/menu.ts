import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
  tags: string[];
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
  currentPage = 1;
  readonly itemsPerPage = 6;

  heroTitle = 'Our Menu';
  heroSubtitle =
    'In enim justo rhoncus ut imperdiet a venenatis vitae justo. Nullam dictum felis eu pede mollis pretium.';
  heroImage =
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80';

  menuCategories: string[] = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

  menuItems: MenuItem[] = [
    {
      name: 'Truffle Arancini',
      description:
        'Crispy risotto balls filled with black truffle and fontina, served with aioli.',
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
      name: 'Carpaccio di Manzo',
      description:
        'Thinly sliced beef tenderloin with capers, arugula, and shaved Parmigiano.',
      price: 24,
      image:
        'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=500&q=80',
      category: 'Starters',
      tags: ['Gluten-free'],
    },
    {
      name: 'Roasted Beet Salad',
      description:
        'Golden and red beets with whipped goat cheese, candied walnuts, and citrus.',
      price: 19,
      image:
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80',
      category: 'Starters',
      tags: ['Vegetarian', 'Gluten-free'],
    },
    {
      name: 'Calamari Fritti',
      description:
        'Lightly fried calamari with a spicy pomodoro dipping sauce and lemon.',
      price: 21,
      image:
        'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500&q=80',
      category: 'Starters',
      tags: ['Pescatarian'],
    },
    {
      name: 'Saffron Risotto',
      description:
        'Classic Milanese risotto with aged Parmigiano-Reggiano and gold leaf.',
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
      name: 'Tagliatelle al Ragù',
      description:
        'House-made tagliatelle with a slow-braised beef and pork ragù.',
      price: 29,
      image:
        'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=80',
      category: 'Mains',
      tags: [],
    },
    {
      name: 'Osso Buco alla Milanese',
      description:
        'Braised veal shank with saffron risotto and a rich gremolata finish.',
      price: 54,
      image:
        'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80',
      category: 'Mains',
      badge: 'Chefs Pick',
      tags: ['Gluten-free'],
    },
    {
      name: 'Wild Mushroom Ravioli',
      description:
        'Hand-folded ravioli filled with wild mushrooms in a sage brown butter.',
      price: 31,
      image:
        'https://images.unsplash.com/photo-1587740908075-9e245070dfc7?w=500&q=80',
      category: 'Mains',
      tags: ['Vegetarian'],
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
    {
      name: 'Panna Cotta al Limone',
      description:
        'Silky lemon panna cotta with a wild berry compote and mint.',
      price: 13,
      image:
        'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&q=80',
      category: 'Desserts',
      tags: ['Vegetarian', 'Gluten-free'],
    },
    {
      name: 'Flourless Chocolate Torte',
      description:
        'Dense dark chocolate torte with hazelnut praline and gold leaf.',
      price: 15,
      image:
        'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&q=80',
      category: 'Desserts',
      badge: 'Chefs Pick',
      tags: ['Vegetarian', 'Gluten-free'],
    },
    {
      name: 'Affogato al Caffè',
      description:
        'Vanilla gelato drowned in a shot of hot espresso, served tableside.',
      price: 11,
      image:
        'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&q=80',
      category: 'Desserts',
      tags: ['Vegetarian'],
    },
    {
      name: 'Negroni Classico',
      description: 'Gin, Campari, and sweet vermouth stirred over ice.',
      price: 16,
      image:
        'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&q=80',
      category: 'Drinks',
      tags: [],
    },
    {
      name: 'Aperol Spritz',
      description:
        'Aperol, prosecco, and soda water with a fresh orange slice.',
      price: 14,
      image:
        'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=500&q=80',
      category: 'Drinks',
      badge: 'Popular',
      tags: [],
    },
    {
      name: 'Barolo DOCG',
      description:
        'Full-bodied red from Piedmont, aged three years in oak, glass or bottle.',
      price: 22,
      image:
        'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&q=80',
      category: 'Drinks',
      tags: ['By the glass'],
    },
    {
      name: 'Espresso Martini',
      description: 'Vodka, espresso, and coffee liqueur shaken until frothy.',
      price: 17,
      image:
        'https://images.unsplash.com/photo-1541591740828-99b03e8c8c9e?w=500&q=80',
      category: 'Drinks',
      tags: [],
    },
  ];

  get filteredMenuItems(): MenuItem[] {
    if (this.activeCategory === 'All') return this.menuItems;
    return this.menuItems.filter(
      (item) => item.category === this.activeCategory,
    );
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

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    document
      .getElementById('menu')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
