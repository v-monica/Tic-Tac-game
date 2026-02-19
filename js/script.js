const celdas = document.querySelectorAll(".celda");
const textoTurno = document.getElementById("turno");
const botonReiniciar = document.getElementById("reiniciar");

const botonX = document.getElementById("eligeX");
const botonO = document.getElementById("eligeO");
const seleccion = document.getElementById("seleccion");
const boardEl = document.getElementById("tablero");

let tablero = ["", "", "", "", "", "", "", "", ""];
let turno = "";
let juegoActivo = false;

const combinaciones = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];



botonX.addEventListener("click", () => {
  iniciarJuego("X");
});

botonO.addEventListener("click", () => {
  iniciarJuego("O");
 
});

function iniciarJuego(jugador) {
  turno = jugador;
  textoTurno.textContent = "Empieza " + turno;
  juegoActivo = true;
  seleccion.style.display = "none";
  setLocked(false);
  if (jugador === "X") {
    botonX.style.color = "#0b6bff";
    botonO.style.color = "";
  } else {
    botonO.style.color = "#00c48c";
    botonX.style.color = "";
  }
}



celdas.forEach((celda, index) => {

  celda.addEventListener("click", () => {
    if (!juegoActivo) return;

    if (tablero[index] === "") {

      tablero[index] = turno;
      celda.textContent = turno;
      celda.classList.add(turno === "X" ? "x" : "o");

      verificarGanador();

      if (juegoActivo) {
        turno = turno === "X" ? "O" : "X";
        textoTurno.textContent = "Turno de: " + turno;
      }
    }
  });

});



function verificarGanador() {

  for (let [a, b, c] of combinaciones) {

    if (
      tablero[a] !== "" &&
      tablero[a] === tablero[b] &&
      tablero[a] === tablero[c]
    ) {
      textoTurno.textContent = " 🏆 Ganó " + tablero[a] + " 🏆";
      juegoActivo = false;
      setLocked(true);
    
    }
  }

  if (!tablero.includes("")) {
    textoTurno.textContent = "Empate 😎";
    juegoActivo = false;
    setLocked(true);
  }
}


function reiniciarJuego() {

  tablero = ["", "", "", "", "", "", "", "", ""];
  turno = "";
  juegoActivo = false;

  textoTurno.textContent = "";

  celdas.forEach(celda => {
    celda.textContent = "";
    celda.classList.remove("x", "o");
  });


  seleccion.style.display = "block";
  setLocked(true);

  botonX.style.color = "";
  botonO.style.color = "";
}

botonReiniciar.addEventListener("click", reiniciarJuego);

function setLocked(locked) {
  if (locked) {
    boardEl.classList.add("locked");
  } else {
    boardEl.classList.remove("locked");
  }
}

setLocked(true);
