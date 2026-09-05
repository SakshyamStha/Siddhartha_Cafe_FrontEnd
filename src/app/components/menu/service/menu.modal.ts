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
