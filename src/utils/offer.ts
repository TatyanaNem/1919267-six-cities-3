import { Sorting } from '../const';
import { Offer } from '../types/offer';

function getRatingWidth(rating: number | undefined) {
  return rating ? `${Math.round(rating) / 0.05}%` : '0%';
}

function groupOffersByLocation(items: Offer[]): Record<string, Offer[]> {
  return items.reduce<Record<string, Offer[]>>((acc, current) => {
    const location = current.city.name;
    if (!(location in acc)) {
      acc[location] = [];
    }
    acc[location].push(current);

    return acc;
  }, {});
}

function sortByRating(itemA: Offer, itemB: Offer) {
  return itemB.rating - itemA.rating;
}

function sortFromLowToHigh(itemA: Offer, itemB: Offer) {
  return itemA.price - itemB.price;
}

function sortFromHighToLow(itemA: Offer, itemB: Offer) {
  return itemB.price - itemA.price;
}

const sorting = {
  [Sorting.Popular]: (offers: Offer[]) => offers.slice(),
  [Sorting.HighToLow]: (offers: Offer[]) => [...offers].sort(sortFromHighToLow),
  [Sorting.LowToHigh]: (offers: Offer[]) => [...offers].sort(sortFromLowToHigh),
  [Sorting.TopRating]: (offers: Offer[]) => [...offers].sort(sortByRating),
};

export { getRatingWidth, groupOffersByLocation, sorting };
