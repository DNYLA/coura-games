//https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/#:~:text=checkValidity()%20method%20is%20used,is%20not%20a%20proper%20URL.
export function isValidUrl(urlString: string) {
  let url;
  try {
    url = new URL(urlString);
  } catch (e) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}
