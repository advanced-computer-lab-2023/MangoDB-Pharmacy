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
export const addMedicineToCart = (medicineName, quantity) =>
  API.post("/Patient/addMedicineInCart", { medicineName, quantity });
export const removeMedicineFromCart = (medicineName) =>
  API.delete("/Patient/removecart", { medicineName });
export const viewAllOrders = () => API.get("/Patient/viewListOfOrders");
export const viewOrderDetails = (id) =>
  API.get(`/Patient/viewOrderDetails/${id}`);
export const cancelOrder = (id) => API.post(`/Patient/cancelOrder/${id}`);
export const patientReg = (patient) =>
  API.post("/Guest/regPatient", patient);
// export const pharmacistReg = (pharmacist) =>
//   API.post("/Guest/regPharma", pharmacist);

export const viewCartItems = () => API.get(`/Patient/ViewCartItems/`,{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
export const changeCartItemAmount = async ( medicineName, quantity) => {
  const response = await API.post(`/Patient/changeCartItemAmount`, {
    medicineName,
    quantity,
  },{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
  return response.data;
};
export const removeCartItems = async ( medicineName) => {
  await API.delete(`/Patient/removecartItems`, {
    data: { medicinename: medicineName },
  },{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
};
export const addressesByPatientId = async () => {
  const response = await API.get(`/Patient/addressesByPatientId`,{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
  return response.data.addresses;
};
export const addAddress = async ( address) => {
  try {
    const response = await API.post(`/Patient/addAddress`, {
      address,
    },{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to add address");
  }
};

export const getAllMedicineUses = () => API.get("/Patient/getAllMedicineUses");
export const getMedicinesByUse = (use) =>
  API.get("/Patient/getMedicinesByUse", { params: { use } });
export const wallet = (patientId) =>
  API.post(`/patient/payFromWallet/${patientId}`);

export const editMedPrice = async (id, details, price) => {
  try {
    const response = await API.put(`/Pharmacist/updateMed/${id}`, {
      details,
      price,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to edit medicine");
  }
};

export const viewPharmacists = () => API.get("/Pharmacist/getPharmacists");
export const getPharmacist = () => API.get(`/Pharmacist/getPharmacist`,{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const viewPatients = () => API.get("/Patient/getPatients");
export const getPatient = () => API.get(`/Patient/getPatient`,{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
export const placeOrder = ( deliveryAddress, paymentMethod) =>
  API.post(`Patient/checkout`, { deliveryAddress, paymentMethod },{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
export const payment = ( items, total) =>
  API.post(`/payments/create-checkout-session`, {
    total: total,
    items: items,
  },{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

const API2 = axios.create({
  baseURL: `http://localhost:4000`,
  timeout: 5000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
export const pharmacistReg = (pharmacist) =>
  API2.post("/Guest/regPharma", pharmacist);

// export const addMed = (medicine) =>
//   API2.post("/Pharmacist/addMedicine", medicine)
//     .then((response) => {
//       console.log("API response:", response);

//       if (!response.ok) {
//         throw new Error(`Failed to add medicine: ${response.statusText}`);
//       }

//       return response.json();
//     })
//     .catch((error) => {
//       console.error("Error adding medicine:", error);
//       throw error;
//     });

export const addMed = (medicine) =>
  API2.post("/Pharmacist/addMedicine", medicine)
    .then((response) => {
      console.log("API response:", response);

      if (!response.ok) {
        throw new Error(`Failed to add medicine: ${response.statusText}`);
      }

      return response.json();
    })
    .catch((error) => {
      console.error("Error adding medicine:", error);
      throw error;
    });

export default API;
