
/** Pide al usuario una palabra no vacía; vuelve a pedir si está vacía/null. */
function pedirPalabra(mensaje = "Ingresá una palabra:") {
  // Repite hasta obtener un string no vacío
  // Si el usuario presiona Cancel seguimos preguntando 
  let entrada;
  do {
    entrada = prompt(mensaje);
    if (entrada !== null) entrada = entrada.trim();
  } while (!entrada);
  return entrada;
}

/** Pide N palabras y devuelve un array con ellas. */
function pedirPalabras(cantidad = 5) {
  const palabras = [];
  for (let i = 1; i <= cantidad; i++) {
    const p = pedirPalabra(`(${i}/${cantidad}) Ingresá una palabra:`);
    palabras.push(p);
  }
  return palabras;
}

/** Invierte una palabra */
function invertirPalabra(palabra) {
  return palabra.split("").reverse().join("");
}

/** Normaliza una palabra */
function normalizar(palabra) {
  return palabra
    .toLowerCase()
}

/** Retorna true si la palabra es palíndromo */
function esPalindromo(palabra) {
  const n = normalizar(palabra);
  return n.length > 0 && n === n.split("").reverse().join("");
}


/* 1. Crear un array de palabras*/

console.log("-----1) Crear array de 5 palabras");
const palabras = pedirPalabras(5);
console.log("Array inicial:", palabras);

/* 2️. Manipular el array*/

console.log("-----2) Manipular el array");

// Agregar una palabra al inicio
const palabraInicio = pedirPalabra("Ingresá una palabra para agregar al INICIO:");
palabras.unshift(palabraInicio);

// Agregar una palabra al final
const palabraFinal = pedirPalabra("Ingresá una palabra para agregar al FINAL:");
palabras.push(palabraFinal);

// Eliminar la segunda palabra
if (palabras.length >= 2) {
  const eliminada = palabras.splice(1, 1)[0];
  console.log(`Se elimino la segunda palabra: "${eliminada}"`);
} else {
  console.log("No hay una segunda palabra para eliminar.");
}

console.log("Array actualizado:", palabras);

/* 3️. Analizar las palabras */

console.log("-----3) Analizar las palabras");

// Longitud de cada palabra
console.log("Longitudes:");
palabras.forEach((p, i) => {
  console.log(`  [${i}] "${p}" → length = ${p.length}`);
});

// Palabra mas larga 
const palabraMasLarga = palabras.reduce((max, actual) =>
  actual.length > max.length ? actual : max,
  ""
);
console.log("Palabra mas larga:", palabraMasLarga);

// contiene la letra a
const contieneA = palabras.some((p) => p.toLowerCase().includes("a"));
console.log("Alguna palabra contiene 'a'?:", contieneA ? "Si" : "No");

/* 4️. Invertir palabras */

console.log("-----4) Invertir palabras");

const invertidas = palabras.map(invertirPalabra);
console.log("Array invertido:", invertidas);
alert("Palabras invertidas:\n" + invertidas.join("\n"));

/* 5️. Palíndromo */

console.log("-----5) Deteccion de palindromos");

const deseaPalindromos = confirm("¿Queres comprobar cuales son palindromos?");
if (deseaPalindromos) {
  const palindromos = palabras.filter(esPalindromo);
  if (palindromos.length) {
    const msg = `Palindromos encontrados:\n- ${palindromos.join("\n- ")}`;
    console.log(msg);
    alert(msg);
  } else {
    console.log("No se encontraron palindromos.");
    alert("No se encontraron palindromos.");
  }
} else {
  console.log("El usuario eligio no comprobar palindromos.");
}

/* 6️. Bonus */

console.log("-----6) Bonus");

const masDeCuatro = palabras.filter((p) => p.length > 4).length;
console.log(`Cantidad de palabras con mas de 4 caracteres: ${masDeCuatro}`);

const unidasConGuion = palabras.join("-");
console.log(`Palabras unidas con "-":`, unidasConGuion);
