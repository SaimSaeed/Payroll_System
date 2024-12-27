import axiosInstance from "./axios";

export default {
  async getUserPayRolls() {
    try {
      const response = await axiosInstance.get(`payrolls/`);
      return response.data;
    } catch (error) {
      console.error("There has been an error:", error);
      throw error; // Rethrow or handle the error
    }
  },
  async getSinglePayRoll(id) {
    try {
      const response = await axiosInstance.get(`payrolls/${id}`);
      return response.data;
    } catch (error) {
      console.error("There has been an error:", error);
      throw error; // Rethrow or handle the error
    }
  },
  async getAllPayrolls() {
    try {
      const response = await axiosInstance.get(`payrolls/all`);
      return response.data;
    } catch (error) {
      console.error("There has been an error:", error);
      throw error; // Rethrow or handle the error
    }
  },
  async UpdateSinglePayroll(data,id) {
    try {
      const response = await axiosInstance.put(`payrolls/${id}`,data);
      return response.data;
    } catch (error) {
      console.error("There has been an error:", error);
      throw error; // Rethrow or handle the error
    }
  },
  async CreatePayroll(data) {
    try {
      const response = await axiosInstance.post(`payrolls/`,data);
      return response.data;
    } catch (error) {
      console.error("There has been an error:", error);
      throw error; // Rethrow or handle the error
    }
  },
  async deletePayroll(id) {
    try {
      const response = await axiosInstance.delete(`payrolls/${id}`);
      return response.data;
    } catch (error) {
      console.error("There has been an error:", error);
      throw error; // Rethrow or handle the error
    }
  },
};
