import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ViewMeds from "./pages/viewMeds";
import GetMeds from "./pages/medicine";
import Orders from "./pages/order";
import OrderDetails from "./pages/orderDetails";
import PharmacistReg from "./pages/pharmaReg";
import PatientReg from "./pages/patientReg";

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
      
            <Route path="/patientReg">
              <PatientReg />
            </Route>
            <Route path="/pharmaReg">
              <PharmacistReg />
            </Route>
            
            <Route path="/viewMeds">
              <ViewMeds />
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
          </Switch>
        </div>
      </div>
    </Router>
  );
}
export default App;
