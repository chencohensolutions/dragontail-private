import axios, { AxiosInstance } from "axios";

class Api {
  private axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:3000/api/1",
    });
  }
  async getOrders() {
    return this.axiosInstance.get("/orders");
  }
};

export const api = new Api();
