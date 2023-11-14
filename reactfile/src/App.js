import "./App.css";
import Home from "./pages/Home";
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
// import AddAdminPage from "./pages/AddAdminPage";
// import RequestedDoctorsPage from "./pages/RequestedDoctorsPage";
import LoginUser from "./components/LoginUser";

function App() {
  return (
    <Router>
          <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard/:id' element={<Dashboard />} />

          <Route path='/addMed' element={<AddMed />} />
           
          <Route path='/medicineAdmin/:id' element={<MedicineAdmin />} />

          <Route path='/viewMedsAdmin' element={<ViewMedsAdmin />} />

          <Route path='/patientReg' element={<PatientReg />} />

          <Route path='/pharmaReg' element={<PharmacistReg />} />

          <Route path='/viewMeds' element={<ViewMeds />} />

          <Route path='/viewMedsPharma' element={<ViewMedsPharma />} />

          <Route path='/DashboardPharma' element={<DashboardPharma />} />

          <Route path='/addMed' element={<AddMed />} />

          <Route path='/cart/:id' element={<ViewCartItems />} />

          <Route path='/viewPharmacists' element={<ViewPharmacists />} />

          <Route path='/viewPatients' element={<ViewPatients />} />

          <Route path='/pharmacistDetails/:id' element={<PharmacistDetails />} />
          
          <Route path="/patientDetails/:id" element={<PatientDetails />} />

          <Route path="/medicinePharma/:id" element={<GetMedPharma />} />

          <Route path="/medicine/:id" element={<GetMeds />} />

          <Route path='/order' element={<Orders />} />

          <Route path="/orderDetails/:id" element={<OrderDetails />} />

          <Route path="/checkout/:id" element={<Checkout />} />

          {/* ===================Admin Routes=================== */}

          <Route path='/admin' element={<DashboardAdmin />} />
					<Route path='/admin/login' element={<LoginPage />} />
					<Route path='/login' element={<LoginUser />} />

					<Route
						path='/admin/forgot-password'
						element={<ForgotPasswordAdminPage />}
					/>

					<Route path='/forgot-password' element={<ForgotPasswordUserPage />} />
					{/* <Route path='/admin/add-admin' element={<AddAdminPage />} /> */}
					{/* <Route
						path='/admin/requested-doctors'
						element={<RequestedDoctorsPage />}
					/> */}

        </Routes>
    </Router>
  );
}
export default App;
