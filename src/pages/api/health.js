export default (req, res) => {
  let body = JSON.stringify(req.headers);
  if (req.connection && req.connection.remoteAddress) {
    body += `\n\nIP: ${req.connection.remoteAddress}`;
  }
  res.statusCode = 200;
  res.send(body);
};
