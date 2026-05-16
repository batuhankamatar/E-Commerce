export const TOGGLE_FAVORITE = "favorites/TOGGLE_FAVORITE";

const savedFavorites = localStorage.getItem("favorites")
  ? JSON.parse(localStorage.getItem("favorites"))
  : [];

const initialState = {
  favorites: savedFavorites,
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE: {
      const product = action.payload;
      const exists = state.favorites.some((item) => item.id === product.id);
      let updatedFavorites;

      if (exists) {
        updatedFavorites = state.favorites.filter(
          (item) => item.id !== product.id,
        );
      } else {
        updatedFavorites = [...state.favorites, product];
      }

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      return {
        ...state,
        favorites: updatedFavorites,
      };
    }
    default:
      return state;
  }
};

export default favoritesReducer;
