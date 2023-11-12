import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  return (
    <div className="home">
      <h2>Home Page</h2>
      <p>This is the home page</p>
      <button onClick={() => history.push("/")}>Home</button>
      <button onClick={() => history.push("/dashboard")}>Dashboard</button>
      <button onClick={() => history.push("/viewMeds")}>Get meds</button>
      <button onClick={() => history.push("/patientReg")}>
        Register as a patient
      </button>
      <button onClick={() => history.push("/pharmaReg")}>
        Register as a pharmacist
      </button>
      <button onClick={() => history.push("/addMed")}>Add Med</button>
    </div>
  );
};

export default Home;
