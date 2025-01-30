import axios from "axios";

const API_URL = "http://localhost:8000/api/vendors";

export const createVendor = async (vendorData) => {
  try {
    console.log("Data being sent to API:", vendorData);
    const response = await axios.post(API_URL, vendorData);
    return response.data;
  } catch (error) {
    console.error("Error creating vendor:", error);
    throw error;
  }
};

export const getVendors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching vendors:", error);
    throw error;
  }
};

export const getVendorById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vendor:", error);
    throw error;
  }
};

export const updateVendor = async (id, vendorData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, vendorData);
    return response.data;
  } catch (error) {
    console.error("Error updating vendor:", error);
    throw error;
  }
};

export const deleteVendor = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting vendor:", error);
    throw error;
  }
};

export const getTotalVendors = async () => {
  try {
    const response = await axios.get(`${API_URL}/count`);
    return response.data;
  } catch (error) {
    console.error("Error fetching total vendors:", error);
    throw error;
  }
};

export const getVendorChangeThisMonth = async () => {
  try {
    const response = await axios.get(`${API_URL}/change`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vendor change this month:", error);
    throw error;
  }
};

//^ Get all vendors
export const fetchAllVendors = async () => {
  try {
    const response = await axios.get(API_URL);

    const vendors = response.data.map((vendor) => ({
      _id: vendor._id,
      vendorName: vendor.vendorName,
    }));

    const uniqueVendors = vendors.filter(
      (vendor, index, self) =>
        index === self.findIndex((v) => v._id === vendor._id)
    );

    return uniqueVendors;
  } catch (error) {
    throw new Error(error.response.data.message || "Error fetching vendors");
  }
};
