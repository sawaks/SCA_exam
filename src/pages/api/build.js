import fs from 'fs';

export default (req, res) => {
  const buffer = fs.readFileSync('.next/BUILD_ID');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({ buildId: buffer.toString() });
};
