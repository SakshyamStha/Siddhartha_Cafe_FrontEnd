export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  dietary: 'veg' | 'non-veg';
  badge?: string;
  popular?: boolean;
  favourite?: boolean;
}

// export interface MenuItem {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
//   // TODO: backend (Prisma MenuItem) has no dietary/popular field yet.
//   // Defaulted in MenuService until the schema/API adds them.
//   dietary: 'veg' | 'non-veg';
//   badge?: string;
//   popular?: boolean;
//   favourite?: boolean;
//   tags?: string[];
// }

// // Shape actually returned by GET /api/menu
// export interface ApiMenuItem {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
//   badge: string | null;
//   tags: string[];
//   order: number;
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// }
