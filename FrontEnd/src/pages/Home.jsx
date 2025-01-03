import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

import "../App.css";

function Home() {
  const [prospects, setProspects] = useState([]);
  const [partners, setPartners] = useState([]);
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8081/prospects"),
      axios.get("http://localhost:8081/audios"),
      axios.get("http://localhost:8081/partners"),
    ])
      .then(([prospectsRes, audiosRes, partnersRes]) => {
        setProspects(prospectsRes.data);
        setAudios(audiosRes.data);
        setPartners(partnersRes.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Bienvenue</h1>
      <Link to="/create"> Nouveau prospect</Link>
      <div className="container">
        <div className="card">
          <h2>Prospects</h2>
          <div className="card_content">
            {prospects != "" ? (
              <>
                <div className="card_prospect card_prospect--Child">
                  <div>
                    <p>NOM</p>
                  </div>
                  <p className="card_prospect-department">DEPARTEMENT</p>
                  <section className="card_prospect-blank">ACTION</section>
                </div>
                {prospects.map((prospect, i) => (
                  <div className="card_prospect" key={i}>
                    <div>
                      <p>{prospect.name}</p>

                      <span>{prospect.phone_number}</span>
                    </div>

                    <p className="card_prospect-department">
                      {prospect.address}
                    </p>
                    <Link
                      className="card_prospect-button"
                      to={`/read/${prospect.id}/${prospect.source}`}
                    >
                      Voir la fiche
                    </Link>
                  </div>
                ))}
              </>
            ) : (
              <p>Rien ici</p>
            )}
          </div>
        </div>

        <div className="card">
          <h2>Audios WyTest</h2>
          <div className="card_content">
            <div className="card_prospect card_prospect--Child">
              <div>
                <p>NOM</p>
              </div>
              <p className="card_prospect-department">DEPARTEMENT</p>
              <section className="card_prospect-blank">ACTION</section>
            </div>
            {audios != "" ? (
              audios.map((prospect, i) => (
                <div className="card_prospect" key={i}>
                  <div>
                    <p>{prospect.name}</p>
                    <span>{prospect.phone_number}</span>
                  </div>
                  <p className="card_prospect-department">{prospect.address}</p>
                  <Link
                    className="card_prospect-button card_prospect-button--Secondary"
                    to={`/read/${prospect.id_audio}/Audio`}
                  >
                    Voir la fiche
                  </Link>
                </div>
              ))
            ) : (
              <p>Rien ici</p>
            )}
          </div>
        </div>

        <div className="card">
          <h2>Partenaires WyTest</h2>
          <div className="card_content">
            <div className="card_prospect card_prospect--Child">
              <div>
                <p>NOM</p>
              </div>
              <p className="card_prospect-department">DEPARTEMENT</p>
              <section className="card_prospect-blank">ACTION</section>
            </div>
            {partners != "" ? (
              partners.map((prospect, i) => (
                <div className="card_prospect" key={i}>
                  <div>
                    <p>{prospect.name}</p>
                    <span>{prospect.phone_number}</span>
                  </div>
                  <p className="card_prospect-department">{prospect.address}</p>
                  <Link
                    className="card_prospect-button card_prospect-button--Tertiary"
                    to={`/read/${prospect.id_partner}/Partner`}
                  >
                    Voir la fiche
                  </Link>
                </div>
              ))
            ) : (
              <p>Rien ici</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
