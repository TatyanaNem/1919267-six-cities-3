import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { FavoritesData } from '../../types/state';
import {
  fetchFavoriteOffers,
  logout,
  updateFavoriteStatus,
} from '../api-actions';

const initialState: FavoritesData = {
  favorites: [],
  favoritesFetchingStatus: RequestStatus.Idle,
};

export const favoritesData = createSlice({
  name: NameSpace.FavoritesData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.favoritesFetchingStatus = RequestStatus.Loading;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.favoritesFetchingStatus = RequestStatus.Success;
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.favoritesFetchingStatus = RequestStatus.Error;
      })
      .addCase(updateFavoriteStatus.fulfilled, (state, action) => {
        const toBeRemoved = action.meta.arg.status === 0;
        const { id, isFavorite } = action.payload.offer;

        state.favorites.forEach((item) => {
          if (item.id === id) {
            item.isFavorite = isFavorite;
          }
        });

        if (toBeRemoved) {
          state.favorites = state.favorites.filter(
            (item) => item.id !== action.payload.offer.id
          );
        } else {
          state.favorites = [...state.favorites, action.payload.offer];
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.favorites = [];
      });
  },
});
