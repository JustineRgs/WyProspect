import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const [values, setValues] = useState({
    name: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/add", values)
      .then((res) => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Ajouter un prospect</h2>
        <div>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="address">Adresse</label>
          <input
            type="text"
            name="address"
            onChange={(e) => setValues({ ...values, address: e.target.value })}
          />
        </div>
        <button>Ajouter</button>
      </form>
    </div>
  );
}

export default Create;
