import { Link, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Read() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/read/" + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8081/delete/" + id)
      .then((res) => navigate("/"))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div>
        <p>Liste des partenaires</p>
        {data.map((partner, i) => {
          return (
            <div key={i}>
              <p>{partner.name}</p>
              <p>{partner.address}</p>
              <Link to={`/update/${partner.id_partner}`}>Modifier</Link>
              <button onClick={() => handleDelete(partner.id_partner)}>
                Supprimer
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Read;
