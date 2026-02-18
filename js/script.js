const celdas = document.querySelectorAll(".celda");
const textoTurno = document.getElementById("turno");
const botonReiniciar = document.getElementById("reiniciar");

const botonX = document.getElementById("eligeX");
const botonO = document.getElementById("eligeO");
const seleccion = document.getElementById("seleccion");

let tablero = ["", "", "", "", "", "", "", "", ""];
let turno = "X";
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
  textoTurno.textContent = turno;
  juegoActivo = true;
  seleccion.style.display = "none";
}



celdas.forEach((celda, index) => {

  celda.addEventListener("click", () => {

    if (!juegoActivo) return;

    if (tablero[index] === "") {

      tablero[index] = turno;
      celda.textContent = turno;

      verificarGanador();

      if (juegoActivo) {
        turno = turno === "X" ? "O" : "X";
        textoTurno.textContent = turno;
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
      textoTurno.textContent = " 🎉 Ganó " + tablero[a] + "🏆";
      juegoActivo = false;
      return;
    }
  }

  if (!tablero.includes("")) {
    textoTurno.textContent = "Empate 😎";
    juegoActivo = false;
  }
}


function reiniciarJuego() {

  tablero = ["", "", "", "", "", "", "", "", ""];
  turno = "X";
  juegoActivo = false;

  textoTurno.textContent = turno;

  celdas.forEach(celda => {
    celda.textContent = "";
  });

  seleccion.style.display = "block"; 
}

botonReiniciar.addEventListener("click", reiniciarJuego);
