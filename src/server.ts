export async function getJobs() {
  return await fetch("https://stankur.pythonanywhere.com/jobs").then((res) =>
    res.json(),
  );
}

export async function searchJobs(query: string) {
  return await fetch(
    `https://stankur.pythonanywhere.com/search?query=${encodeURIComponent(query)}`,
  ).then((res) => res.json());
}
