const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "wyprospect",
});

app.get("/", (req, res) => {
  return res.json("from back");
});

// Propects
app.get("/prospects", (req, res) => {
  const sql = `SELECT 'Partner' AS source, id_partner AS id, name, address, phone_number, comment
  FROM partners
  WHERE wytest = 0
  UNION ALL
  SELECT 'Audio' AS source, id_audio AS id, name, address, phone_number, comment
  FROM audios
  WHERE wytest = 0
  ORDER BY name ASC; `;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Partners signed with Wytest
app.get("/partners", (req, res) => {
  const sql = "SELECT * FROM partners WHERE wytest = 1";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Audios signed with Wytest
app.get("/audios", (req, res) => {
  const sql = "SELECT * FROM audios WHERE wytest = 1";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/addPartner", (req, res) => {
  const sql =
    "INSERT INTO partners (`name`, `address`, `phone_number`, `comment`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.address,
    req.body.phoneNumber,
    req.body.comment,
  ];

  db.query(sql, [values], (err, data) => {
    return res.json(data);
  });
});

app.post("/addAudio", (req, res) => {
  const sql =
    "INSERT INTO audios (`name`, `address`, `phone_number`, `comment`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.address,
    req.body.phoneNumber,
    req.body.comment,
  ];

  db.query(sql, [values], (err, data) => {
    return res.json(data);
  });
});

app.get("/readPartner/:id", (req, res) => {
  const sql = "SELECT * FROM partners WHERE id_partner = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/readAudio/:id", (req, res) => {
  const sql = "SELECT * FROM audios WHERE id_audio = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.put("/updatePartner/:id", (req, res) => {
  const sql =
    "UPDATE partners SET `name` = ?, `address`=? , `phone_number`=?, `comment`=? WHERE id_partner=?";
  const id = req.params.id;

  db.query(
    sql,
    [
      req.body.name,
      req.body.address,
      req.body.phoneNumber,
      req.body.comment,
      id,
    ],
    (err, data) => {
      return res.json(data);
    }
  );
});

app.put("/updateAudio/:id", (req, res) => {
  const sql =
    "UPDATE audios SET `name` = ?, `address`=? , `phone_number`=?, `comment`=? WHERE id_audio=?";
  const id = req.params.id;

  db.query(
    sql,
    [
      req.body.name,
      req.body.address,
      req.body.phoneNumber,
      req.body.comment,
      id,
    ],
    (err, data) => {
      return res.json(data);
    }
  );
});

app.delete("/deletePartner/:id", (req, res) => {
  const sql = "DELETE FROM partners WHERE id_partner=?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    return res.json(data);
  });
});

app.delete("/deleteAudio/:id", (req, res) => {
  const sql = "DELETE FROM audios WHERE id_audio=?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    return res.json(data);
  });
});

app.listen(8081, () => {
  console.log("pouet");
});
