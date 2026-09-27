export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  dietary?: 'veg' | 'non-veg';
  drinkType?: 'hot' | 'cold' | 'hard';
  badge?: string;
  popular?: boolean;
  favourite?: boolean;
  tags?: string[];
}

// Shape actually returned by GET /api/menu
export interface ApiMenuItem {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  badge: string | null;
  tags: string[];
  popular: boolean;
  favourite: boolean;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}