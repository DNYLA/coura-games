export const getAPIUrl = () => {
  const url = process.env.NX_API_URL;
  if (!url) throw 'API URL not defined';

  return url;
};

export const getSocketUrl = () => {
  const url = process.env.NX_SOCKET_URL;
  if (!url) throw 'Socket URL not defined';

  return url;
};
