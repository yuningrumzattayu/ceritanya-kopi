const express = require("express");
const app = express();
const port = 3000;
const session = require("express-session");

const routes = require("./routes");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "ceritanya-kopi",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
