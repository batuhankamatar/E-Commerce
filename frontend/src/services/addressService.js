import axiosInstance from "../api/axiosInstance";

export const addressService = {
  getAddresses: async (userId) => {
    const response = await axiosInstance.get(`/address/user/${userId}`);
    return response.data;
  },

  createAddress: async (userId, addressData) => {
    const response = await axiosInstance.post(
      `/address/${userId}`,
      addressData,
    );
    return response.data;
  },

  updateAddress: async (addressId, addressData) => {
    const response = await axiosInstance.put(
      `/address/${addressId}`,
      addressData,
    );
    return response.data;
  },

  deleteAddress: async (addressId) => {
    const response = await axiosInstance.delete(`/address/${addressId}`);
    return response.data;
  },
};
