import axios from "axios";

// Base URL for your API (adjust this based on your backend URL)
const API_URL = "http://localhost:8000/api/projects";

// Function to create a new project
export const createProject = async (projectData) => {
  try {
    const response = await axios.post(API_URL, projectData);
    return response.data; // Return the created project data
  } catch (error) {
    console.error("Error creating project:", error);
    throw error; // Handle the error as needed
  }
};

// Function to get all projects
export const getProjects = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Return the list of projects
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error; // Handle the error as needed
  }
};

// Function to get a single project by ID
export const getProjectById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; // Return the project data
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error; // Handle the error as needed
  }
};

// Function to update a project by ID
export const updateProject = async (id, projectData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, projectData);
    return response.data; // Return the updated project data
  } catch (error) {
    console.error("Error updating project:", error);
    throw error; // Handle the error as needed
  }
};

// Function to delete a project by ID
export const deleteProject = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data; // Return a success message or the deleted project data
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error; // Handle the error as needed
  }
};
