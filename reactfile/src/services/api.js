import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // backend API URL
  timeout: 5000, // Timeout duration
  headers: {
    "Content-Type": "application/json",
  },
});

export const viewMeds = () => API.get("/Patient/viewMed");
export const getMeds = (id) => API.get(`/Patient/getMed/${id}`);
export const addMedicineToCart = (medicineName, quantity) =>
  API.post("/Patient/addMedicineInCart", { medicineName, quantity },{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
export const removeMedicineFromCart = (medicineName) =>
  API.delete("/Patient/removecart", { medicineName });
export const viewAllOrders = () => API.get("/Patient/viewListOfOrders",{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
export const viewOrderDetails = (id) =>
  API.get(`/Patient/viewOrderDetails/${id}`);
export const cancelOrder = (id) => API.post(`/Patient/cancelOrder/${id}`);
export const patientReg = (patient) =>
  API.post("/Guest/regPatient", patient);
// export const pharmacistReg = (pharmacist) =>
//   API.post("/Guest/regPharma", pharmacist);

export const viewCartItems = () => API.get(`/Patient/ViewCartItems`,{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
export const changeCartItemAmount = async ( medicineName, quantity) => {
  const response = await API.post(`/Patient/changeCartItemAmount`, {
    medicineName,
    quantity,
  },{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
  return response.data;
};
export const removeCartItems = async (medicinename) => {
  await API.delete(`/Patient/removeCartItems`, {
    data: { medicinename },  // Correct way to send data in the request body
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
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
export const getDifMeds = () => API.get("/Pharmacist/difMeds");
export const getAllSales = () => API.get("/Pharmacist/allSales")
  .then(response => response.data);  // Add this line

  export const getSalesByMonth = (month) => API.post(`/Pharmacist/sales`, { month })
  .then(response => response.data);  // Add this line

  export const getSalesByDate = (date) => API.post(`/Pharmacist/sales/date`, { date })
  .then(response => response.data);  // Add this line

  export const getSalesByMedicine = (medicineName) => API.post(`/Pharmacist/salesMed`, { medicineName })
  .then(response => response.data);  // Add this line


  export const getAllPharmacists = () => API.get(`/Patient/getAllPharmacists`,{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

  export const createChat = (pharmacistFirstName,pharmacistLastName) => API.post("/Patient/createChat",{ pharmacistFirstName,pharmacistLastName },{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
  export const getPharmacistbyId = (id) => API.get(`/Pharmacist/getPharmacistById/${id}`);

  export const sendMessage = ( messageText, receiverId) => API.post("/Patient/sendMessage",{ messageText, receiverId},{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
  export const sendMessagePharma = ( messageText, receiverId) => API.post("/Pharmacist/sendMessage",{ messageText, receiverId},{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const getAllMedicineUses = () => API.get("/Patient/getAllMedicineUses");
export const getMedicinesByUse = (use) =>
  API.get("/Patient/getMedicinesByUse", { params: { use } });
export const wallet = (patientId) =>
  API.post(`/patient/payFromWallet/${patientId}`);/////////////////////

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
export const getPharmacist = () => API.post(`/Pharmacist/getPharmacist`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const viewPatients = () => API.get("/Patient/getPatients");
export const getPatient = (id) => API.get(`/Patient/getPatientById/${id}`);

export const placeOrder = ( deliveryAddress, paymentMethod) =>
  API.post(`Patient/checkout`, { deliveryAddress, paymentMethod },{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
export const payment = (items, total) =>
  API.post(`/payments/create-checkout-session`, {
    total: total,
    items: items,
  },{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

const API2 = axios.create({
  baseURL: `http://localhost:8000`,
  timeout: 5000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
export const pharmacistReg = (pharmacist) =>
  API2.post("/Guest/regPharma", pharmacist);

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


    export const changePassword = ({ oldPassword, newPassword, confirmPassword }) => {
      return API.post(
        "/Admin/change-password",
        { oldPassword, newPassword, confirmPassword },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
    };

    export const changePassword2 = ({ oldPassword, newPassword, confirmPassword }) => {
      return API.post(
        "/Patient/change-password",
        { oldPassword, newPassword, confirmPassword },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
    };

    export const changePassword3 = ({ oldPassword, newPassword, confirmPassword }) => {
      return API.post(
        "/Pharmacist/change-password",
        { oldPassword, newPassword, confirmPassword },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
    };

    
    export const getAlternativeMedicines = (medicineName) => {
      console.log('Received request with medicine name:', medicineName);
      return API.post("/Patient/getAlternativeMedicines", { medicineName: medicineName })
        .then((response) => {
          console.log('Received response from getAlternativeMedicines API:', response);
          return response.data;
        })
        .catch((error) => {
          console.error('Error fetching alternative medicines:', error);
          throw error;
        });
    };

    export const getPendingPharma = () => API.get("/Admin/getPendingPharma");


    export const pharamacistApproval = (id) => API.post(`/Admin/pharmacist-approval/${id}`);
    export const pharamacistRejection = (id) => API.post(`/Admin/pharmacist-rejection/${id}`);
export const viewPharmacist = (id) => API.get(`/Pharmacist/getPharmacistById/${id}`);//////////////////
export const viewWallet  = () => API.get(`/Patient/viewWallet`,{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });//////////////////



export const unarchiveMedicine = (medicineName) =>
API.post("/Pharmacist/unarchiveMedicine", { medicineName })
  .then((response) => response.data)
  .catch((error) => {
    console.error("Error unarchiving medicine:", error);
    throw error;
  });

  export const archiveMedicine = (medicineName) =>
API.post("/Pharmacist/archiveMedicine", { medicineName })
  .then((response) => response.data)
  .catch((error) => {
    console.error("Error archiving medicine:", error);
    throw error;
  });

  export const viewArchivedMeds = () => API.get("/Pharmacist/viewArchivedMeds");



  
export const getChat = ({ pharmacistId }) =>
API.post("/Patient/getChat", { pharmacistId }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
  .then((response) => response.data)
  .catch((error) => {
    console.error("Error fetching chat:", error);
    throw error;
  });
  export const getChatPharmaPat = ({ patientId }) =>
API.post("/Pharmacist/getChat", { patientId }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
  .then((response) => response.data)
  .catch((error) => {
    console.error("Error fetching chat:", error);
    throw error;
  });

  export const getPatientbyId = (id) => API.get(`/Patient/getPatientById/${id}`);

export const clearNotifs = (id) => API.patch('/Pharmacist/clearNotifs', { id }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
export const seenNotifs = () => API.patch('/Pharmacist/seenNotifs', {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const viewChats = () =>
API.get('/Patient/viewChats', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});



export const viewChatsPharma = () =>
API.get('/Pharmacist/viewChats', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
export const viewChats2 = () =>
API.get('/Pharmacist/viewChats2', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

  
export const getAllDoctors = () => API.get(`/Pharmacist/getAllDoctors`,{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const createChat2 = (doctorFirstName, doctorLastName) => API.post("/Pharmacist/createChat2",{ doctorFirstName,doctorLastName },{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const getDoctorbyId = (id) => API.get(`/Pharmacist/getDoctorById/${id}`);

export const getChat2 = ({ doctorId }) =>
API.post("/Pharmacist/getChat2", { doctorId }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
  .then((response) => response.data)
  .catch((error) => {
    console.error("Error fetching chat:", error);
    throw error;
  });

    export const sendMessage2 = ( messageText, receiverId) => API.post("/Pharmacist/sendMessage2",{ messageText, receiverId},{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

    export const deletePatient = (id) => API.delete(`/Admin/deletePatient/${id}`);
    export const deletePharma = (id) => API.delete(`/Admin/deletePharma/${id}`);

export default API;
