import { Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { ApiService } from '../../../api- configs/api';
import { ApiMenuItem, MenuItem } from './menu.modal';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private menuItems$?: Observable<MenuItem[]>;

  constructor(private apiService: ApiService) {}

  getMenuItems(): Observable<MenuItem[]> {
    if (!this.menuItems$) {
      this.menuItems$ = this.apiService.getList('MENU_LIST').pipe(
        map((items: ApiMenuItem[]) => items.map((i) => this.mapItem(i))),
        shareReplay(1),
      );
    }
    return this.menuItems$;
  }

  private mapItem(i: ApiMenuItem): MenuItem {
    const tags = i.tags || [];
    const isDrink = i.category?.toLowerCase() === 'drinks';

    let dietary: 'veg' | 'non-veg' | undefined;
    let drinkType: 'hot' | 'cold' | 'hard' | undefined;

    if (isDrink) {
      if (tags.includes('Hot')) drinkType = 'hot';
      else if (tags.includes('Cold')) drinkType = 'cold';
      else if (tags.includes('Hard Drinks')) drinkType = 'hard';
    } else {
      dietary = tags.includes('Non-Veg') ? 'non-veg' : 'veg';
    }

    return {
      id: i.slug,
      name: i.name,
      description: i.description,
      price: i.price,
      image: i.image,
      category: i.category,
      dietary,
      drinkType,
      badge: i.badge ?? undefined,
      popular: i.popular,
      favourite: i.favourite,
      tags,
    };
  }
}