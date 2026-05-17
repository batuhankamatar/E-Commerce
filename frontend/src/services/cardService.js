import axiosInstance from "../api/axiosInstance";

export const cardService = {
  getCards: async (userId) => {
    const response = await axiosInstance.get(`/user/card/user/${userId}`);
    return response.data;
  },

  createCard: async (userId, cardData) => {
    const backendPayload = {
      cardNo: cardData.card_no,
      expireMonth: parseInt(cardData.expire_month, 10),
      expireYear: parseInt(cardData.expire_year, 10),
      nameOnCard: cardData.name_on_card,
    };
    const response = await axiosInstance.post(
      `/user/card/${userId}`,
      backendPayload,
    );
    return response.data;
  },

  updateCard: async (cardId, cardData) => {
    const backendPayload = {
      id: cardId,
      cardNo: cardData.card_no,
      expireMonth: parseInt(cardData.expire_month, 10),
      expireYear: parseInt(cardData.expire_year, 10),
      nameOnCard: cardData.name_on_card,
    };
    const response = await axiosInstance.put(
      `/user/card/${cardId}`,
      backendPayload,
    );
    return response.data;
  },

  deleteCard: async (cardId) => {
    const response = await axiosInstance.delete(`/user/card/${cardId}`);
    return response.data;
  },
};
