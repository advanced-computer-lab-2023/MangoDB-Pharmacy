import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h2>Home Page</h2>
      <p>This is the home page</p>
      <button onClick={() => navigate("/admin")}>Admin Dashboard</button>
      <button onClick={() => navigate("/admin/login")}>Login admin</button>
      <button onClick={() => navigate("/login")}>Login user</button>
      <button onClick={() => navigate("/patientReg")}>
        Register as a patient
      </button>
      <button onClick={() => navigate("/pharmaReg")}>
        Register as a pharmacist
      </button>
    </div>
  );
};

export default Home;
