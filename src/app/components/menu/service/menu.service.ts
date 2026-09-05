import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { MenuItem } from './menu.modal';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private menuItems$?: Observable<MenuItem[]>;

  constructor(private http: HttpClient) {}

  getMenuItems(): Observable<MenuItem[]> {
    if (!this.menuItems$) {
      this.menuItems$ = this.http
        .get<MenuItem[]>('assets/data/menu-data.json')
        .pipe(shareReplay(1));
    }
    return this.menuItems$;
  }
}
