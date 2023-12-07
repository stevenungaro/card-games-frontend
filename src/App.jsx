import { useState, useEffect } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import xmlJs from "xml-js";

function App() {
  const [games, setGames] = useState([]);




  // STILL TRYING TO GET THIS TO WORK
  const XMLDisplay = () => {
    const [xmlData, setXmlData] = useState(null);

    useEffect(() => {
      fetch("https://boardgamegeek.com/xmlapi2/thing?id=294693.xml") // Replace with the URL or path to your XML data
        .then((response) => response.text())
        .then((xmlText) => {
          const jsonData = xmlJs.xml2json(xmlText, { compact: true, spaces: 4 });
          setXmlData(JSON.parse(jsonData));
        })
        .catch((error) => {
          console.error("Error fetching XML data:", error);
        });
    }, []);

    return <div>{xmlData ? <pre>{JSON.stringify(xmlData, null, 4)}</pre> : <p>Loading XML data...</p>}</div>;
  };

  const handleIndexGames = () => {
    axios.get("https://boardgamegeek.com/xmlapi2/thing?id=294693.json").then((response) => {
      console.log(response.data);
      setGames(response.data);
    });
  };
  // const handleIndexGames = () => {
  //   axios.get("https://dog.ceo/api/breeds/image/random").then((response) => {
  //     console.log(response.data);
  //     setGames(response.data);
  //   });
  // };

  useEffect(handleIndexGames, []);

  return (
    <div>
      <header>
        <a href="#">home</a>
        <a href="games-index">all games</a>
        <a href="games-new">new game</a>
      </header>

      <div>
        <h1>all games</h1>
        <img src={games.message} alt="" />
      </div>

      <div>
        <h1>new game</h1>
        <form>
          <div>
            Game Title: <input type="text" />
            Designer: <input type="text" />
            Image: <input type="text" />
          </div>
        </form>
      </div>

      <footer>
        <p>Copyright 2023</p>
      </footer>
    </div>
  );
}

export default App;
