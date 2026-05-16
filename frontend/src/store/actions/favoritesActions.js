import { TOGGLE_FAVORITE } from "../reducers/favoritesReducer";
import { toast } from "react-toastify";

export const toggleProductFavorite = (product) => (dispatch, getState) => {
  dispatch({ type: TOGGLE_FAVORITE, payload: product });

  const { favorites } = getState().favorites;
  const isFav = favorites.some((item) => item.id === product.id);

  if (isFav) {
    toast.success(`${product.name} favorilerinize eklendi!`);
  } else {
    toast.info(`${product.name} favorilerinizden kaldırıldı.`);
  }
};
