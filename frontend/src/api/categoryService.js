import axiosInstance from "./axiosInstance";

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Kategoriler çekilirken bir hata oluştu:", error);
    throw error;
  }
};
