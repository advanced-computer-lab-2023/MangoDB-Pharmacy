import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ViewMeds from "./pages/viewMeds";
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
            {/* <Route path="/patientdashboard">
              <PatientDashboard />
            </Route> */}
            <Route path="/viewMeds">
              <ViewMeds />
            </Route>
            <Route path="/patientReg">
              <PatientReg />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
export default App;
