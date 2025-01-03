import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();
  const [prospectType, setProspectType] = useState("Partner");
  const [values, setValues] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    comment: "",
  });

  const handleOptionChange = (event) => {
    setProspectType(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/add" + prospectType, values)
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
        <div>
          <label htmlFor="phone_number">Numéro de téléphone</label>
          <input
            type="text"
            name="phone_number"
            onChange={(e) =>
              setValues({ ...values, phoneNumber: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="comment">Commentaire</label>
          <textarea
            name="comment"
            onChange={(e) => setValues({ ...values, comment: e.target.value })}
          />
        </div>
        <div>
          <input
            type="radio"
            id="Partner"
            name="option"
            value="Partner"
            checked={prospectType === "Partner"}
            onChange={handleOptionChange}
          />
          <label htmlFor="partners">Partenaires</label>

          <input
            type="radio"
            id="Audio"
            name="option"
            value="Audio"
            checked={prospectType === "Audio"}
            onChange={handleOptionChange}
          />
          <label htmlFor="Audio">Audios</label>
        </div>
        <button>Ajouter</button>
      </form>
    </div>
  );
}

export default Create;
