import "./App.css";
import Home from "./pages/Home/Blog";
import Dashboard from "./components/Dashboard";
import DashboardPharma from "./components/DashboardPharma";
import DashboardAdmin from "./components/DashboardAdmin";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewMeds from "./pages/viewMeds";
import GetMeds from "./pages/medicine";
import Orders from "./pages/order";
import OrderDetails from "./pages/orderDetails";
import PharmacistReg from "./pages/pharmaReg";
import PatientReg from "./pages/patientReg";
import ViewCartItems from "./pages/cart";
import Checkout from "./pages/checkout";
import AddMed from "./pages/addMed";
import ViewMedsPharma from "./pages/viewMedsPharma";
import GetMedPharma from "./pages/medicinePharma";
import ViewPharmacists from "./pages/viewPharmacists";
import PharmacistDetails from "./pages/pharmacistDetails";
import ViewPatients from "./pages/viewPatients";
import PatientDetails from "./pages/patientDetails";
import ViewMedsAdmin from "./pages/viewMedsAdmin";
import MedicineAdmin from "./pages/medicineAdmin";
import LoginPage from "./pages/LoginAdminPage";
import ForgotPasswordAdminPage from "./pages/ForgotPasswordAdminPage";
import ForgotPasswordUserPage from "./pages/ForgotPasswordUserPage";
import AddAdminPage from "./pages/addAdmin";
// import RequestedDoctorsPage from "./pages/RequestedDoctorsPage";
import LoginUser from "./components/LoginUser";
import ChangePasswordAdmin from "./pages/changePasswordAdmin";
import ChangePasswordPatient from "./pages/changePasswordPatient";
import ChangePasswordPharmacist from "./pages/changePasswordPharmacist";
import ViewSales from "./pages/sales";
import ViewSalesAdmin from "./pages/salesAdmin";

import Requests from "./pages/requestedPharma";
import PharamcistDetail from "./pages/Pharmacists";

import WalletPage from "./pages/wallet";
import WalletPharma from "./pages/walletPharma";
import ArchivedMedicines from "./pages/archivedMedicines";

import NewChat from "./pages/newChat";
import Chat from "./pages/chat";
import PatientChats from "./pages/viewPatientChats";
import PatientPharma from "./pages/chatPharmacistPatient";

import Chat2 from "./pages/chat2";
import RemoveUsers from "./pages/removeUsers";

import PharmacistChatDoctor from "./pages/pharmacistChatDoctor";

import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import AdminHeader from "./components/AdminHeader"; // Correct import statement
import Register from "./pages/register";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/DashboardAdmin" element={<DashboardAdmin />} />

          <Route path="/addMed" element={<AddMed />} />

          <Route path="/medicineAdmin/:id" element={<MedicineAdmin />} />

          <Route path="/viewMedsAdmin" element={<ViewMedsAdmin />} />

          <Route path="/patientReg" element={<PatientReg />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/pharmacistChatDoctor"
            element={<PharmacistChatDoctor />}
          />

          <Route path="/pharmaReg" element={<PharmacistReg />} />

          <Route path="/viewMeds" element={<ViewMeds />} />

          <Route path="/viewMedsPharma" element={<ViewMedsPharma />} />

          <Route path="/DashboardPharma" element={<DashboardPharma />} />

          <Route path="/addMed" element={<AddMed />} />

          <Route path="/cart" element={<ViewCartItems />} />

          <Route path="/viewPharmacists" element={<ViewPharmacists />} />

          <Route path="/viewPatients" element={<ViewPatients />} />

          <Route
            path="/pharmacistDetails/:id"
            element={<PharmacistDetails />}
          />

          <Route path="/patientDetails/:id" element={<PatientDetails />} />

          <Route path="/medicinePharma/:id" element={<GetMedPharma />} />

          <Route path="/medicine/:id" element={<GetMeds />} />

          <Route path="/order" element={<Orders />} />

          <Route path="/sales" element={<ViewSales />} />

          <Route path="/salesAdmin" element={<ViewSalesAdmin />} />

          <Route path="/orderDetails/:id" element={<OrderDetails />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/wallet" element={<WalletPage />} />

          <Route path="/walletPharma" element={<WalletPharma />} />
          <Route path="/archivedMedicines" element={<ArchivedMedicines />} />
          <Route path="/newChat" element={<NewChat />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/chat2/:id" element={<Chat2 />} />
          <Route path="/removeUsers" element={<RemoveUsers />} />

          <Route
            path="/changePasswordPatient"
            element={<ChangePasswordPatient />}
          />
          <Route path="/viewPatientChats" element={<PatientChats />} />
          <Route
            path="/chatPharmacistPatient/:id"
            element={<PatientPharma />}
          />

          <Route
            path="/changePasswordPharmacist"
            element={<ChangePasswordPharmacist />}
          />

          {/* ===================Admin Routes=================== */}
          <Route
            path="/changePasswordAdmin"
            element={<ChangePasswordAdmin />}
          />
          <Route path="/addadmin" element={<AddAdminPage />} />

          {/* <Route path="/admin" element={<AdminHeader />} /> */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/requestedPharma" element={<Requests />} />

          <Route path="/Pharamcists/:id" element={<PharamcistDetail />} />
          <Route
            path="/admin/forgot-password"
            element={<ForgotPasswordAdminPage />}
          />

          <Route path="/forgot-password" element={<ForgotPasswordUserPage />} />
          {/* <Route path='/admin/add-admin' element={<AddAdminPage />} /> */}
          {/* <Route
						path='/admin/requested-doctors'
						element={<RequestedDoctorsPage />}
					/> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;
