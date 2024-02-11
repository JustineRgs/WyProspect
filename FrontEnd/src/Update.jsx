import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Update() {
  const { id } = useParams();
  const [values, setValues] = useState({
    name: "",
    address: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/read/" + id)
      .then((res) => {
        setValues({
          ...values,
          name: res.data[0].name,
          address: res.data[0].address,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8081/update/" + id, values)
      .then((res) => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <h2>Modifier</h2>
        <div>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="address">Adresse</label>
          <input
            type="text"
            name="address"
            value={values.address}
            onChange={(e) => setValues({ ...values, address: e.target.value })}
          />
        </div>
        <button>Modifier</button>
        <Link to={"/"}>Retour</Link>
      </form>
    </div>
  );
}

export default Update;
