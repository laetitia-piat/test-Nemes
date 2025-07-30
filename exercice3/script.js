const mergeIntervals = (intervals) => {
  // Si la liste d'intervalles est vide, on retourne un tableau vide
  if (intervals.length === 0) return [];

  // On trie les intervalles par leur début (ordre croissant)
  intervals.sort((a, b) => a[0] - b[0]);

  // Tableau pour stocker les intervalles fusionnés
  const merged = [];

  // On commence avec le premier intervalle comme intervalle courant
  let currentInterval = intervals[0];

  // On parcourt les intervalles à partir du deuxième
  for (let i = 1; i < intervals.length; i++) {
    const nextInterval = intervals[i];

    // Si le prochain intervalle commence avant que le courant ne se termine,
    // alors ils se chevauchent et on fusionne en prenant la fin la plus grande
    if (nextInterval[0] <= currentInterval[1]) {
      currentInterval[1] = Math.max(currentInterval[1], nextInterval[1]);
    } else {
      // Sinon, on ajoute l'intervalle courant dans le résultat
      merged.push(currentInterval);
      // Et on remplace l'intervalle courant par le prochain
      currentInterval = nextInterval;
    }
  }

  // On ajoute le dernier intervalle courant qui reste à fusionner
  merged.push(currentInterval);

  // On retourne la liste des intervalles fusionnés
  return merged;
};

// Liste d'intervalles à fusionner
const intervals = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
];

// On affiche les intervalles initiaux dans l'élément avec id "initial"
document.getElementById("initial").textContent = intervals
  .map((i) => `(${i[0]}, ${i[1]})`)
  .join(", ");
document.getElementById("merged").textContent = mergeIntervals(intervals)
  .map((i) => `(${i[0]}, ${i[1]})`)
  .join(", ");
