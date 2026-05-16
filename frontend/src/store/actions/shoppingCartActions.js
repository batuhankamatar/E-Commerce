import axiosInstance from "../../api/axiosInstance";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  TOGGLE_CART_ITEM,
  CLEAR_CART,
  SET_CART_LIST,
} from "../reducers/shoppingCartReducer";
import { toast } from "react-toastify";

export const fetchCart = (userId) => (dispatch) => {
  if (!userId) return;
  return axiosInstance
    .get(`/cart/${userId}`)
    .then((res) => {
      const normalizedCart = res.data.map((item) => ({
        id: item.id,
        count: item.quantity,
        checked: true,
        product: {
          id: item.productId,
          name: item.productName,
          price: item.unitPrice,
          mainImage:
            item.productMainImage ||
            item.mainImage ||
            item.product?.mainImage ||
            item.product?.images?.[0] ||
            null,
        },
      }));
      dispatch({ type: SET_CART_LIST, payload: normalizedCart });
    })
    .catch((err) => {
      console.error("Sepet yüklenirken hata oluştu:", err);
    });
};

export const addProductToCart =
  (product, quantity = 1, userId = null) =>
  (dispatch) => {
    dispatch({ type: ADD_TO_CART, payload: { product, quantity } });
    toast.success(`${product.name} sepete eklendi!`);

    if (userId) {
      return axiosInstance
        .post(`/cart/${userId}`, {
          productId: product.id,
          quantity: quantity,
        })
        .catch((err) => {
          console.error("Backend sepet eşitleme hatası:", err);
        });
    }
  };

export const updateCartItemQuantity =
  (productId, quantity, cartId = null) =>
  (dispatch) => {
    if (quantity <= 0) {
      dispatch({ type: REMOVE_FROM_CART, payload: { productId } });
      if (cartId) axiosInstance.delete(`/cart/${cartId}`);
      return;
    }

    dispatch({ type: UPDATE_CART_QUANTITY, payload: { productId, quantity } });

    if (cartId) {
      axiosInstance.put(`/cart/${cartId}?quantity=${quantity}`).catch((err) => {
        console.error("Backend adet güncelleme hatası:", err);
      });
    }
  };

export const removeProductFromCart =
  (productId, cartId = null) =>
  (dispatch) => {
    dispatch({ type: REMOVE_FROM_CART, payload: { productId } });
    toast.info("Ürün sepetten kaldırıldı.");

    if (cartId) {
      axiosInstance.delete(`/cart/${cartId}`).catch((err) => {
        console.error("Backend sepetten silme hatası:", err);
      });
    }
  };

export const toggleCartItemCheck = (productId) => ({
  type: TOGGLE_CART_ITEM,
  payload: { productId },
});

export const clearShoppingBag =
  (userId = null) =>
  (dispatch) => {
    dispatch({ type: CLEAR_CART });
    if (userId) {
      return axiosInstance.delete(`/cart/clear/${userId}`).catch((err) => {
        console.error("Backend sepet temizleme hatası:", err);
      });
    }
  };
