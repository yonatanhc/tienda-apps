var express = require("express");
var mysql = require("mysql");
var app = express();
var session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "2C44-4D44-WppQ38S",
    resave: true,
    saveUninitialized: true,
  })
);

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "aplicaciones",
  port: 3306,
});

app.post(
  "/login",
  [check("email").isEmail(), check("password").isLength({ min: 8 })],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    mysqlConnection.query(
      "SELECT * FROM user WHERE email=?",
      [req.body.email],
      function (err, result, fields) {
        if (result.length == 0) {
          return res.status(422).json({ errors: "no existe email" });
        } else {
          const validPassword = bcrypt.compare(
            req.body.password,
            result[0].password
          );
          if (validPassword) {
            console.log("usuario correcto!");
            res.json({
              nombre: result[0].nombre,
              email: result[0].email,
              id_user: result[0].id_user,
              tipo: result[0].tipo,
              apps: result[0].apps,
            });
          } else {
            return res.status(422).json({ errors: "password incorrecto" });
          }
        }
      }
    );
  }
);

app.post(
  "/saveuser",
  [
    check("nombre").isLength({ min: 3 }),
    check("email").isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    await mysqlConnection.query(
      "SELECT email FROM user WHERE email = ?",
      [req.body.email],
      async (err, result, fields) => {
        if (result[0]) {
          res.status(422).json({ errors: "email ya existe" });
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(req.body.password, salt);
          const value = [
            req.body.email,
            hashPassword,
            req.body.nombre,
            req.body.tipo,
            "",
          ];
          await mysqlConnection.query(
            "INSERT INTO user (email,password,nombre,tipo,apps) VALUES (?,?,?,?,?)",
            value,
            (err, result, fields) => {
              if (err)
                res.status(422).json({ errors: "error al guardar usuario" });
              else {
                res.status(200).json(result);
              }
            }
          );
        }
      }
    );
  }
);

app.post("/actualizaruser", (req, res) => {
  var array = req.body.apps.toString();
  mysqlConnection.query(
    "UPDATE user SET apps = ? WHERE id_user= ?",
    [array, req.body.id_user],
    (err, result, fields) => {
      if (err) console.log(err);
      else {
        res.json(result.affectedRows);
      }
    }
  );
});

app.post("/setapp", (req, res) => {
  const value = [
    req.body.categoria,
    req.body.nombre,
    req.body.precio,
    req.body.imagen,
  ];
  mysqlConnection.query(
    "INSERT INTO app (categoria,nombre,precio,imagen) VALUES (?,?,?,?)",
    value,
    (err, result, fields) => {
      if (err) res.status(422).json({ errors: "error al guardar app" });
      else {
        res.status(200).json({ ok: "app guardado corectamente" });
      }
    }
  );
});

app.post("/actualizarapp", (req, res) => {
  console.log(req.body);

  mysqlConnection.query(
    "UPDATE app SET nombre=?,precio=? WHERE id_app= ?",
    [req.body.nombre, req.body.precio, req.body.id],
    (err, result, fields) => {
      if (err) console.log(err);
      else {
        res.json(result.affectedRows);
      }
    }
  );
});

app.get("/listar", (req, res) => {
  mysqlConnection.query("SELECT * FROM app", function (err, result, fields) {
    if (err) console.log(err);
    else {
      res.json(result);
    }
  });
});

app.get("/buscar", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM app WHERE id_app =" + req.query.idapp,
    function (err, result, fields) {
      if (err) res.status(422).json({ errors: "error al tratar de buscar" });
      else {
        res.status(200).json(result);
      }
    }
  );
});

app.get("/buscarnombre", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM app WHERE nombre = " + req.query.nombre,
    function (err, result, fields) {
      if (err) res.status(422).json({ errors: "error al tratar de buscar" });
      else {
        res.json(result);
      }
    }
  );
});

app.get("/eliminar", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM app WHERE id_app = " + req.query.idApp,
    function (err, result, fields) {
      if (err) console.log(err);
      else {
        console.log("id eliminado es:" + result.affectedRows);
        res.send("eliminado");
      }
    }
  );
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("escuchando puerto  " + port));
