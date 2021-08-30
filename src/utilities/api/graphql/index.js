const API = process.env.NEXT_PUBLIC_API_PC_ONE_GQL;

export default async function fetchAPI(
  query,
  variables = {},
  cacheStrategy = 'default'
) {
  const endpoint = `${API}?query=${encodeURI(query)}&variables=${encodeURI(JSON.stringify(variables))}`;
  const res = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: cacheStrategy,
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error('Failed to fetch API');
  }
  return json.data;
}
