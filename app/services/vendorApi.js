import axios from "axios";


const API_URL = "http://localhost:8000/api/vendors";

// Function to create a new vendor
export const createVendor = async (vendorData) => {
  try {
    console.log('Data being sent to API:', vendorData);
    const response = await axios.post(API_URL, vendorData);
    return response.data; // Return the created vendor data
  } catch (error) {
    console.error("Error creating vendor:", error);
    throw error; // Handle the error as needed
  }
};

// Function to get all vendors
export const getVendors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Return the list of vendors
  } catch (error) {
    console.error("Error fetching vendors:", error);
    throw error; // Handle the error as needed
  }
};

// Function to get a single vendor by ID
export const getVendorById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; // Return the vendor data
  } catch (error) {
    console.error("Error fetching vendor:", error);
    throw error; // Handle the error as needed
  }
};

// Function to update a vendor by ID
export const updateVendor = async (id, vendorData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, vendorData);
    return response.data; // Return the updated vendor data
  } catch (error) {
    console.error("Error updating vendor:", error);
    throw error; // Handle the error as needed
  }
};

// Function to delete a vendor by ID
export const deleteVendor = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data; // Return a success message or the deleted vendor data
  } catch (error) {
    console.error("Error deleting vendor:", error);
    throw error; // Handle the error as needed
  }
};

// Function to get the total number of vendors
export const getTotalVendors = async () => {
  try {
    const response = await axios.get(`${API_URL}/count`);
    return response.data; // Return the total vendors count
  } catch (error) {
    console.error("Error fetching total vendors:", error);
    throw error; // Handle the error as needed
  }
};

// Function to get the change in vendors for the current month
export const getVendorChangeThisMonth = async () => {
  try {
    const response = await axios.get(`${API_URL}/change`);
    return response.data; // Return the change in vendor count for this month
  } catch (error) {
    console.error("Error fetching vendor change this month:", error);
    throw error; // Handle the error as needed
  }
};
