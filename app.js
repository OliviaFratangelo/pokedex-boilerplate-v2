const express = require("express");
const morgan = require("morgan");
const pokeBank = require("./pokeBank");
const pokeList = require("./views/pokeList");
const pokeDetails = require("./views/pokeDetails");
const Pokemon = require("./models/Pokemon");
const Trainer = require("./models/Trainer");
const db = require("./db");

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));


(async () => {
  try {
    await db.sync();

    // Create Trainers
    await Trainer.create({
      name: "Ash Ketchum",
    });

    await Trainer.create({
      name: "Misty",
    });

    await Trainer.create({
      name: "Brock",
    });

    // Create Pokemon
    await Pokemon.create({
      name: "Pikachu",
      type: "Electric",
      trainer: "Ash",
      date: "2023-07-19",
      image: "https://www.giantbomb.com/a/uploads/scale_medium/0/6087/2437349-pikachu.png",
      TrainerId: 1, // Set the TrainerId based on the corresponding Trainer's ID
    });

    await Pokemon.create({
      name: "Charizard",
      type: "Fire/Flying",
      trainer: "Ash",
      date: "2023-07-19",
      image: "https://www.giantbomb.com/a/uploads/square_medium/13/135472/1891763-006charizard.png",
      TrainerId: 1,
    });

    await Pokemon.create({
      name: "Bulbasaur",
      type: "Grass/Poison",
      trainer: "Ash",
      date: "2023-07-19",
      image: "https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png",
      TrainerId: 1,
    });

    await Pokemon.create({
      name: "Squirtle",
      type: "Water",
      trainer: "Ash",
      date: "2023-07-19",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
      TrainerId: 1,
    });

    await Pokemon.create({
      name: "Jigglypuff",
      type: "Normal/Fairy",
      trainer: "Misty",
      date: "2023-07-19",
      image: "https://archives.bulbagarden.net/media/upload/3/3a/0039Jigglypuff.png",
      TrainerId: 2,
    });

    await Pokemon.create({
      name: "Gengar",
      type: "Ghost/Poison",
      trainer: "Brock",
      date: "2023-07-19",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/094.png",
      TrainerId: 3,
    });

    console.log("Models synced with database");
  } catch (error) {
    console.error(error);
  }
})();


app.get("/", (req, res) => {
  const pokemon = pokeBank.list();
  res.send(pokeList(pokemon));
});

app.get("/pokemon", async (req, res) => {
  const pokemon = await Pokemon.findAll();
  res.json(pokemon);
})

app.get("/pokemon/:id", async (req, res) => {
  const pokemon = await Pokemon.findByPk(req.params.id);
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).send("Pokemon doesnt exist");
  }
});

app.post("/pokemon", async (req, res) => {
  const newPokemon = await Pokemon.create(req.body);
  res.json(newPokemon);
})

app.put("/pokemon/:id", async (req, res) => {
  const pokemon = await Pokemon.findByPk(req.params.id);
  if (pokemon) {
    await pokemon.update(req.body);
    res.json(pokemon);
  } else {
    res.status(404).send("Pokemon not found");
  }
});

app.delete("/pokemon/:id", async (req, res) => {
  const pokemon = await Pokemon.findByPk(req.params.id);
  if (pokemon) {
    await pokemon.destroy();
    res.status(204).send();
  } else {
    res.status(404).send("Pokemon not found");
  }
});

const PORT = 1337;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});