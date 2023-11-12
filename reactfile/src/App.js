import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import DashboardPharma from "./components/DashboardPharma";
import DashboardAdmin from "./components/DashboardAdmin";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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





function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/addMed">
              <AddMed />
            </Route>
           

            <Route path="/medicineAdmin/:id">
              <MedicineAdmin />
            </Route>

            <Route path="/viewMedsAdmin">
              <ViewMedsAdmin/>
            </Route>

            <Route path="/patientReg">
              <PatientReg />
            </Route>
            <Route path="/pharmaReg">
              <PharmacistReg />
            </Route>

            <Route path="/viewMeds">
              <ViewMeds />
            </Route>

            <Route path="/viewMedsPharma">
              <ViewMedsPharma />
            </Route>

          
            <Route path="/DashboardPharma">
              <DashboardPharma/>
            </Route>

            <Route path="/DashboardAdmin">
              <DashboardAdmin/>
            </Route>

            <Route path="/addMed">
              <AddMed />
            </Route>

            <Route path="/cart/:id">
              <ViewCartItems />
            </Route>


            <Route path="/viewPharmacists">
            <ViewPharmacists />
            </Route>s

            <Route path="/viewPatients">
            <ViewPatients />
            </Route>s
          

            <Route path="/pharmacistDetails/:id">
            <PharmacistDetails />
            </Route>

            <Route path="/patientDetails/:id">
            <PatientDetails />
            </Route>

            
            <Route path="/medicinePharma/:id">
              <GetMedPharma />
            </Route>

            <Route path="/medicine/:id">
              <GetMeds />
            </Route>
            <Route path="/order">
              <Orders />
            </Route>
            <Route path="/orderDetails/:id">
              <OrderDetails />
            </Route>
            <Route path="/checkout" exact component={Checkout} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
export default App;
