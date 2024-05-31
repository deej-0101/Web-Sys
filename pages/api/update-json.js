import fs from "fs";

export default (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    fs.writeFileSync('./pages/api/user.json', JSON.stringify(data));

    res.status(200).json({ message: "File updated" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};