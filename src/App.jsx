import { useState } from "react";

function App() {
  const [enemy, setEnemy] = useState("goblin");
  const [animation, setAnimation] = useState("attack");
  const [imageUrl, setImageUrl] = useState("");

  const fetchGif = () => {
    setImageUrl(`http://localhost:8080/${enemy}/${animation}.gif`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Загрузить анимацию</h1>
      <input
        type="text"
        placeholder="Имя врага"
        value={enemy}
        onChange={(e) => setEnemy(e.target.value)}
      />
      <input
        type="text"
        placeholder="Анимация"
        value={animation}
        onChange={(e) => setAnimation(e.target.value)}
      />
      <button onClick={fetchGif}>Показать GIF</button>

      {imageUrl && <img src={imageUrl} alt="Анимация" />}
    </div>
  );
}

export default App;
