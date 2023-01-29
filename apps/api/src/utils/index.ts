export const getFrontendURL = () => {
  const url = process.env.FRONT_END_URL;
  console.log(url);
  if (!url) throw 'Front End URL not defined';

  return url;
};
