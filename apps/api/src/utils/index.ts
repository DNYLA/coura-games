export const getFrontendURL = () => {
  const url = process.env.FRONT_END_URL;
  console.log('Here');
  console.log(process.env.production);
  if (!url) throw 'Front End URL not defined';

  return url;
};
