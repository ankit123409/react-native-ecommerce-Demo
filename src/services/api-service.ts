import axios from "axios";
import { SelectedEnvironment } from "../config/selected-environment";
const BASE_URL = SelectedEnvironment.APP_URL;
const api = axios.create({
  baseURL: BASE_URL,
});

const commonHeader = {
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
};

const getRequest = async (endPoint: string, customHeaders?: any) => {
  try {
    const headers = { ...commonHeader, ...customHeaders };
    const response = await api.get(endPoint, { headers });
    return response;
  } catch (error: any) {
    
    if (SelectedEnvironment.shouldLogRequestResponse) {
      console.log("API Service - GET Request Error:", endPoint, error);
    }
    return error;
  }
};



const ApiService = {
  api,
  getRequest,
};

export default ApiService;
