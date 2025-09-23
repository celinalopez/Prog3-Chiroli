"use strict";

/* 1) Invertir un array sin .reverse*/
function invertirArray(arr) {
  const a = [...arr];               
  let i = 0, j = a.length - 1;
  while (i < j) {
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
    i++; j--;
  }
  return a;
}
console.log("1) invertirArray:", invertirArray([1,2,3,4])); 

/*2) Palíndromo */
function esPalindromo(str) {
  const norm = str
    .toLowerCase();                       

  let i = 0, j = norm.length - 1;
  while (i < j) {
    if (norm[i] !== norm[j]) return false;
    i++; j--;
  }
  return norm.length > 0;
}
console.log("2) esPalindromo('reconocer'):", esPalindromo("reconocer"));

/* 3) Contar vocales  */
function contarVocales(str) {
  const vocales = "aeiouáéíóúüAEIOUÁÉÍÓÚÜ";
  let count = 0;
  for (const ch of str) {
    if (vocales.includes(ch)) count++;
  }
  return count;
}

console.log("3) contarVocales('Javascript ES Genial'):", contarVocales("Javascript ES Genial")); // 7

/* 4) Rotación a la derecha  */
function rotarDerecha(arr) {
  const n = arr.length;
  if (n === 0) return [];
  return [arr[n - 1], ...arr.slice(0, n - 1)];
}

console.log("4) rotarDerecha:", rotarDerecha([10,20,30,40]));

/* 5) Ordenar números sin .sort()  */
function ordenarNumeros(arr) {
  const a = [...arr];
  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = key;
  }
  return a;
}

console.log("5) ordenarNumeros:", ordenarNumeros([5,2,9,1])); 

/* 6) Reemplazo de palabras */
function reemplazarTodas(texto, target, reemplazo) {
  if (target === "") return texto; // evita loop infinito
  return texto.split(target).join(reemplazo);
}

console.log(
  "6) reemplazarTodas:",
  reemplazarTodas("me gusta programar en Java", "Java", "JavaScript")
); 

/* 7) Números únicos sin Set */
function numerosUnicos(arr) {
  const vistos = Object.create(null);
  const res = [];
  for (const n of arr) {
    const k = String(n);           // clave por número
    if (!vistos[k]) {
      vistos[k] = true;
      res.push(n);
    }
  }
  return res;
}

console.log("7) numerosUnicos:", numerosUnicos([1,2,2,3,4,4,5])); 

/* 8) Intersección de arrays únicos sin Set*/
function interseccion(arr1, arr2) {
  const mapa = Object.create(null);
  for (const x of arr1) mapa[String(x)] = true;

  const res = [];
  const agregado = Object.create(null);
  for (const y of arr2) {
    const ky = String(y);
    if (mapa[ky] && !agregado[ky]) {
      agregado[ky] = true;
      res.push(y);
    }
  }
  return res;
}

console.log("8) interseccion:", interseccion([1,2,3,4], [3,4,5,6])); 

/* 9) Contar palabras (normaliza a minúsculas, quita puntuación simple)  */
function contarPalabras(texto) {
  // Minúsculas y reemplazo de puntuación por espacios
  const limpio = texto
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")  // deja letras/números unicode, separa el resto
    .trim();

  if (!limpio) return {};
  const partes = limpio.split(/\s+/);
  const conteo = Object.create(null);
  for (const p of partes) {
    conteo[p] = (conteo[p] || 0) + 1;
  }
  return conteo;
}

console.log("9) contarPalabras:", contarPalabras("hola mundo hola javascript"));


/* 10) Matriz transpuesta*/
function transpuesta(matriz) {
  if (!Array.isArray(matriz) || matriz.length === 0) return [];
  const filas = matriz.length;
  const cols = matriz[0].length;
  const res = Array.from({ length: cols }, () => Array(filas));
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < cols; j++) {
      res[j][i] = matriz[i][j];
    }
  }
  return res;
}

const M = [
  [1,2,3],
  [4,5,6],
];
console.log("10) transpuesta:", transpuesta(M));

