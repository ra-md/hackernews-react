const BASE_URL = "https://api.hnpwa.com/v0";

export default async function getData(path) {
   const response = await fetch(`${BASE_URL}/${path}.json`);
   return response.json();
}
