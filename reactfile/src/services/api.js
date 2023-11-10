import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000", // backend API URL
  timeout: 5000, // Timeout duration
  headers: {
    "Content-Type": "application/json",
  },
});

export const viewMeds = () => API.get("/Patient/viewMed");
export const getMeds = (id) => API.get(`/Patient/getMed/${id}`);
export const addMedicineToCart = ( medicineName, quantity) => API.post("/Patient/addMedicineInCart", { medicineName, quantity });
export const removeMedicineFromCart = ( medicineName) => API.delete("/Patient/removecart", { medicineName });
export const viewAllOrders = () => API.get("/Patient/viewListOfOrders");

export default API;