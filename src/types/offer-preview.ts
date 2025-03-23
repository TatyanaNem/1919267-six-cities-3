import { City } from './city';
import { Location } from './location';

export type OfferPreview = {
  city: City;
  id: string;
  isFavorite: boolean;
  isPremium: boolean;
  location: Location;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};
