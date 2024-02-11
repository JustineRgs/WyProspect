import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";

function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/partners")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(data);
  return (
    <>
      <div>
        <p>Liste des partenaires</p>
        <Link to="/create"> Nouveau prospect</Link>
        {data.map((partner, i) => {
          return (
            <div key={i}>
              <p>{partner.name}</p>
              <p>{partner.address}</p>
              <Link to={`/read/${partner.id_partner}`}>Voir</Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
