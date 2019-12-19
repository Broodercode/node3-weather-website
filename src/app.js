const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

const name = "Chris Schiebelbein";

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Chris Schiebelbein"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error});
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }
      res.send({
        location,
        forecastData
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Chris Schiebelbein",
    helpText: "This is some helpful text"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Chris Schiebelbein"
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help article not found",
    name: "Chris Schiebelbein"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 - page not found",
    name
    //name const can be declared earlier to make code more DRY
  });
});
//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
