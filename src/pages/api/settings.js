export default (req, res) => {
  const body = JSON.stringify(process.env);
  res.statusCode = 200;
  res.send(body);
};
