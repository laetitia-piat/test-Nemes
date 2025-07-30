const mergeIntervals = (intervals) => {
  if (intervals.length === 0) return [];

  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [];

  let currentInterval = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    const nextInterval = intervals[i];

    if (nextInterval[0] <= currentInterval[1]) {
      currentInterval[1] = Math.max(currentInterval[1], nextInterval[1]);
    } else {
      merged.push(currentInterval);
      currentInterval = nextInterval;
    }
  }

  merged.push(currentInterval);

  return merged;
};

const intervals = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
];

document.getElementById("initial").textContent = intervals
  .map((i) => `(${i[0]}, ${i[1]})`)
  .join(", ");
document.getElementById("merged").textContent = mergeIntervals(intervals)
  .map((i) => `(${i[0]}, ${i[1]})`)
  .join(", ");
