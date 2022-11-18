export const getFrontendURL = () => {
  const url = process.env.FRONT_END_URL;
  if (!url) throw 'Front End URL not defined';

  return url;
};
