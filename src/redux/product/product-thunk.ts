import ApiService from "../../services/api-service";
import { PRODUCT_END_POINTS } from "./product-end-points";

export const getProductsAPI = async () => {
  const apiEndPoint = PRODUCT_END_POINTS.getProducts;

  try {
    const response = await ApiService.getRequest(apiEndPoint);
    console.log("Product Thunk - Get Products Response:", response);
    if (response?.data && response?.status === 200) {
      return response.data;
    }

    return Promise.reject(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};