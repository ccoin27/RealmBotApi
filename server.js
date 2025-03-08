const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Сигма момент");
});

// Отдаём GIF-анимации
app.get("/:enemy/:animation.gif", (req, res) => {
  const { enemy, animation } = req.params;
  const filePath = path.join(__dirname, "sprites/enemies", enemy, `${animation}.gif`);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("Файл не найден");
    }
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
