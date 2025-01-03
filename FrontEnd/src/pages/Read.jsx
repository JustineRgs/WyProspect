import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function Read() {
  const { id, source } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/read" + source + "/" + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8081/delete" + source + "/" + id)
      .then((res) => navigate("/"))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div>
        <p>Liste des partenaires</p>
        {data.map((prospect, i) => {
          console.log(prospect);
          return (
            <div key={i}>
              <p>{prospect.name}</p>
              <p>{prospect.address}</p>
              {source === "Partner" ? (
                <Link to={`/update/${prospect.id_partner}/Partner`}>
                  Modifier
                </Link>
              ) : (
                <Link to={`/update/${prospect.id_audio}/Audio`}>Modifier</Link>
              )}

              <button
                onClick={() =>
                  handleDelete(
                    source === "Partner"
                      ? prospect.id_partner
                      : prospect.id_audio
                  )
                }
              >
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
