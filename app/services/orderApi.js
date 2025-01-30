import axios from "axios";

const API_URL = "http://localhost:8000/api/orders";

//^ create a new order
export const createOrder = async (orderData) => {
  try {
    const formattedData = {
      requiredEmployees: orderData.requiredEmployees,
      techStack: Array.isArray(orderData.techStack)
        ? orderData.techStack
        : [orderData.techStack],
      vendor: orderData.vendor,
      status: orderData.status,
    };

    const response = await axios.post(API_URL, formattedData);
    return response.data;
  } catch (error) {
    console.error("Create error:", error);
    throw new Error(error.response?.data?.message || "Error creating order");
  }
};

//^ get all orders
export const getAllOrders = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error fetching orders");
  }
};

//^ get a single order by ID
export const getOrderById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error fetching order");
  }
};

//^ update an order by ID
export const updateOrder = async (id, orderData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, orderData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error updating order");
  }
};

//^ delete an order by ID
export const deleteOrder = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error deleting order");
  }
};

//^ count the number of active orders
export const countActiveOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/count/active`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Error counting active orders"
    );
  }
};

//^ get the three most recent orders
export const getRecentOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/recent`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Error fetching recent orders"
    );
  }
};

//^ count the number of orders fulfilled this week
export const countOrdersFulfilledThisWeek = async () => {
  try {
    const response = await axios.get(`${API_URL}/count/fulfilled-this-week`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Error counting fulfilled orders this week"
    );
  }
};
