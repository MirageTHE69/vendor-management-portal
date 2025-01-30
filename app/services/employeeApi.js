import axios from "axios";

const API_URL = "http://localhost:8000/api/employees";

//^ Create a new employee
export const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(API_URL, employeeData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error creating employee");
  }
};

//^ Get all employees
export const getAllEmployees = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error fetching employees");
  }
};

//^ Get a single employee by ID
export const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error fetching employee");
  }
};

//^ Update an employee
export const updateEmployee = async (id, employeeData) => {
  try {
    console.log(employeeData);
    const response = await axios.put(`${API_URL}/${id}`, employeeData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error updating employee");
  }
};

//^ Delete an employee
export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error deleting employee");
  }
};

//^ Count the number of employees
export const countEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/count`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error counting employees");
  }
};

//^ Count the number of employees hired in the current month
export const countEmployeesHiredThisMonth = async () => {
  try {
    const response = await axios.get(`${API_URL}/count/hired-this-month`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Error counting employees hired this month"
    );
  }
};

//^ Get all vendors
export const getAllVendors = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    const vendors = response.data.map((item) => ({
      _id: item.vendor._id,
      vendorName: item.vendor.vendorName,
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
