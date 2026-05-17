import axiosInstance from "../api/axiosInstance";

export const orderService = {
  createOrder: async (userId, addressId) => {
    const backendPayload = {
      userId: userId,
      addressId: addressId,
    };
    const response = await axiosInstance.post("/orders", backendPayload);
    return response.data;
  },

  getPreviousOrders: async (userId) => {
    const response = await axiosInstance.get(`/orders/user/${userId}`);
    return response.data;
  },
};
