import axiosInstance from "./axios";

export default {
  /**
   * Login method to authenticate a user.
   * @returns {Promise<Object>} - Promise resolving to the login response data
   */
  async login(userData) {
    try {
      const response = await axiosInstance.post(`auth/login`, userData);
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Rethrow or handle the error
    }
  },

  /**
   * Register method to create a new user.
   * @returns {Promise<Object>} - Promise resolving to the registration response data
   */
  async register(data) {
    try {
      const response = await axiosInstance.post(`auth/`,data);
      return response.data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error; // Rethrow or handle the error
    }
  },
  async logOutUser() {
    try {
      await axiosInstance.post(`auth/logout`);
    } catch (error) {
      console.error("LogOut failed:", error);
      throw error; // Rethrow or handle the error
    }
  },
  async profile() {
    try {
      const response = await axiosInstance.get(`auth/profile`);
      return response.data;
    } catch (error) {
      console.error("Profile Not Found:", error);
      throw error; // Rethrow or handle the error
    }
  },
  async updateProfile(data) {
    try {
      const response = await axiosInstance.put(`auth/profile`, data);
      return response.data;
    } catch (error) {
      console.error("Profile Not Updated:", error);
      throw error; // Rethrow or handle the error
    }
  },
  async getAllUsers() {
    try {
      const response = await axiosInstance.get(`auth/users`);
      return response.data;
    } catch (error) {
      console.error("There has been an error:", error);
      throw error; // Rethrow or handle the error
    }
  },
  async getSingleUser(id) {
    try {
      const response = await axiosInstance.get(`auth/${id}`);
      return response.data;
    } catch (error) {
      console.error("There has been an error:", error);
      throw error; // Rethrow or handle the error
    }
  },
  async UpdateSingleUser(data, id) {
    try {
      const response = await axiosInstance.put(`auth/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("There has been an error:", error);
      throw error; // Rethrow or handle the error
    }
  },
  async DeleteSingleUser(id) {
    try {
      const response = await axiosInstance.delete(`auth/${id}`);
      return response.data;
    } catch (error) {
      console.error("There has been an error:", error);
      throw error; // Rethrow or handle the error
    }
  },
 
};
