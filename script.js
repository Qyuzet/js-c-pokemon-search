const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const PokemonName = document.getElementById("pokemon-name");
const PokemonId = document.getElementById("pokemon-id");
const Weight = document.getElementById("weight");
const Height = document.getElementById("height");
const SpriteContainer = document.querySelector("#sprite-container img");
const Types = document.querySelector("#types");
const Hp = document.getElementById("hp");
const Attack = document.getElementById("attack");
const Defense = document.getElementById("defense");
const SpecialAttack = document.getElementById("special-attack");
const SpecialDefense = document.getElementById("special-defense");
const Speed = document.getElementById("speed");

const endPoint = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const showData = (data) => {
  const { name, id, weight, height, sprites, stats, types } = data;

  const hpStat =
    stats.find((stat) => stat.stat.name === "hp")?.base_stat || "N/A";
  const attackStat =
    stats.find((stat) => stat.stat.name === "attack")?.base_stat || "N/A";
  const defenseStat =
    stats.find((stat) => stat.stat.name === "defense")?.base_stat || "N/A";
  const specialAttackStat =
    stats.find((stat) => stat.stat.name === "special-attack")?.base_stat ||
    "N/A";
  const specialDefenseStat =
    stats.find((stat) => stat.stat.name === "special-defense")?.base_stat ||
    "N/A";
  const speedStat =
    stats.find((stat) => stat.stat.name === "speed")?.base_stat || "N/A";
  const typesName = types.map((type) => type.type.name);

  console.log(
    name,
    id,
    weight,
    height,
    sprites.front_default,
    hpStat,
    attackStat,
    typesName
  );

  PokemonName.textContent = name.toUpperCase();
  PokemonId.textContent = `#${id}`;
  Weight.textContent = `Weight: ${weight}`;
  Height.textContent = `Height: ${height}`;
  SpriteContainer.src = sprites.front_default;
  SpriteContainer.id = "sprite";

  Types.innerHTML = "";
  typesName.forEach((type) => {
    const typeElement = document.createElement("span"); // Create a span element

    typeElement.textContent = type.toUpperCase(); // Set the text content to the type name
    typeElement.classList.add("type"); // Optionally add a class for styling
    Types.appendChild(typeElement); // Append the new span to the Types container
  });
  Hp.textContent = hpStat;
  Attack.textContent = attackStat;
  Defense.textContent = defenseStat;
  SpecialAttack.textContent = specialAttackStat;
  SpecialDefense.textContent = specialDefenseStat;
  Speed.textContent = speedStat;
};
const fetchData = async (type) => {
  try {
    const res = await fetch(`${endPoint}/${type.toLowerCase()}`);
    const data = await res.json();
    console.log(data);
    showData(data);
  } catch (err) {
    alert("Pokémon not found");
  }
};

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    console.log("search query:", query);
    fetchData(query);
  }
});
