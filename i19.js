const i19 = () => [
  // i19.1
  createSequence(initialTune(), "minorUp", "majorUp", "minorDown", "minorDown"),
  // i19.2
  createSequence(
    initialTune(),
    "majorDown",
    "majorDown",
    "minorUp",
    "majorDown"
  ),
  // i19.3
  createSequence(
    initialTune(),
    "minorDown",
    "majorUp",
    "minorDown",
    "minorDown",
    "majorUp"
  ),
  // i19.4
  createSequence(
    initialTune(),
    "minorUp",
    "majorDown",
    "minorUp",
    "majorDown",
    "minorUp"
  ),
  // i19.5
  createSequence(
    initialTune(),
    "minorDown",
    "minorDown",
    "majorUp",
    "majorUp",
    "minorUp"
  ),
  // i19.6
  createSequence(initialTune(), "minorUp", "majorDown", "minorUp", "minorUp")
];

const i19reversed = () => [
  // i19.1 invertido
  createSequence(initialTune(), "minorUp", "majorUp", "majorDown", "minorDown"),
  // i19.2 invertido
  createSequence(initialTune(), "majorUp", "minorDown", "majorUp", "majorUp"),
  // i19.3 invertido
  createSequence(
    initialTune(),
    "majorDown",
    "minorUp",
    "minorUp",
    "majorDown",
    "minorUp"
  ),
  // i19.4 invertido
  createSequence(
    initialTune(),
    "minorDown",
    "majorUp",
    "minorDown",
    "majorUp",
    "minorDown"
  ),
  // i19.5 invertido
  createSequence(
    initialTune(),
    "minorDown",
    "majorDown",
    "majorDown",
    "minorUp",
    "minorUp"
  ),
  // i19.6 invertido
  createSequence(initialTune(), "minorDown", "minorDown", "majorUp", "majorUp")
];

const i19TotalShuffled = () =>
  [...i19(), ...i19reversed()].sort(() => (Math.random() > 0.5 ? 1 : -1));
const playSequenceWithTimeUsing = (sequence, time, fn) =>
  sequence.forEach((tune, offset) =>
    setTimeout(() => fn(tune.value), offset * time)
  );

let solution = null;
let chose = null;
const play = (time = 1500) => {
  chosen = i19TotalShuffled()[0];
  solution = chosen.map(obj => obj.action).toString();
  playSequenceWithTimeUsing(chosen, time, presspianokey);
};
const playAgain = (time = 1500) => {
  playSequenceWithTimeUsing(chosen, time, presspianokey);
};

const playNThirds = (nThirds = 7, time = 1500) => {
  const thirds = Array(nThirds)
    .fill(true)
    .map(() => (Math.random() > 0.5 ? "minor" : "major"))
    .map(val => val + (Math.random() > 0.5 ? "Up" : "Down"));
  chosen = createSequence(initialTune(), ...thirds);
  solution = chosen.map(obj => obj.action).toString();
  playSequenceWithTimeUsing(chosen, time, presspianokey);
};

const playQuad = (time = 1500) => {
  const direction = Math.random() > 0.5 ? "Up" : "Down";
  const thirds = Array(3)
    .fill(true)
    .map(() => (Math.random() > 0.5 ? "minor" : "major"))
    .map(val => val + direction);
  chosen = createSequence(initialTune(), ...thirds);
  solution = chosen.map(obj => obj.action).toString();
  playSequenceWithTimeUsing(chosen, time, playaudio);
};

const buttonPlay = document.createElement("button");
buttonPlay.innerHTML = "Reproducir i19 aleatorio";
buttonPlay.onclick = () => play();

const buttonPlayQuad = document.createElement("button");
buttonPlayQuad.innerHTML = "Reproducir cuatríada";
buttonPlayQuad.onclick = () => playQuad();

const buttonPlaySeven = document.createElement("button");
buttonPlaySeven.innerHTML = "Reproducir 7 terceras";
buttonPlaySeven.onclick = () => playNThirds(7);

const buttonReplay = document.createElement("button");
buttonReplay.innerHTML = "Volver a reproducir";
buttonReplay.onclick = () => playAgain();

const buttonHint = document.createElement("button");
buttonHint.innerHTML = "Mostrar solucion";
buttonHint.onclick = () => alert(solution);

const contenedor = document.createElement("div");
contenedor.appendChild(buttonPlay);
contenedor.appendChild(buttonPlayQuad);
contenedor.appendChild(buttonPlaySeven);
contenedor.appendChild(document.createElement("hr"));
contenedor.appendChild(buttonHint);
contenedor.appendChild(buttonReplay);
contenedor.style.margin = "1em";
contenedor.style.padding = "1em";
contenedor.style.background = "rgba(255,255,0,.3)";
document.querySelector("header").appendChild(contenedor);
