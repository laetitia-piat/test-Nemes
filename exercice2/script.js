const quickSort = (arr) => {
  // Si le tableau contient 0 ou 1 élément, il est déjà trié, on le retourne directement
  if (arr.length <= 1) return arr;

  // On choisit le dernier élément du tableau comme pivot
  const pivot = arr[arr.length - 1];

  // On crée deux tableaux pour ranger les éléments plus petits et plus grands que le pivot
  const left = [];
  const right = [];

  // On parcourt tous les éléments sauf le pivot
  for (let i = 0; i < arr.length - 1; i++) {
    // Si l'élément est plus petit que le pivot, on le met dans 'left'
    if (arr[i] < pivot) left.push(arr[i]);
    // Sinon, on le met dans 'right'
    else right.push(arr[i]);
  }

  // On trie récursivement les tableaux 'left' et 'right',
  // puis on les combine avec le pivot pour retourner le tableau trié
  return [...quickSort(left), pivot, ...quickSort(right)];
};

// Exemple de tableau à trier
const numbers = [34, 7, 23, 32, 5, 62];

// On trie le tableau avec la fonction quickSort
const sorted = quickSort(numbers);

// Affichage dans la console
console.log("Tableau trié :", sorted);

// Affichage dans la page HTML
document.body.innerHTML += `
  <p><strong>Avant tri :</strong> ${numbers.join(", ")}</p>
  <p><strong>Après tri :</strong> ${sorted.join(", ")}</p>
`;
