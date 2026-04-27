import axiosInstance from "./axiosInstance";

export const uploadProductImage = async (productId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosInstance.post(
      `/products/${productId}/upload-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Görsel yükleme hatası:", error);
    throw error;
  }
};
