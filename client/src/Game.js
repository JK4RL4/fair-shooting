import {useState, useEffect} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import GameIntro from './GameIntro';
import GameEnd from './GameEnd';
import GameLevel1 from './GameLevel1';
import GameLevel2 from './GameLevel2';
import GameLevel3 from './GameLevel3';
import Target from './Target';
import Player from './Player';
import Footer from './Footer';
import Duck from './Duck';
import Blocker from './Blocker';
import TextPanel from './TextPanel';
import titleImg from './img/duck_left.png';
import funcs from './functions';
import shotUrl from './sounds/shot.mp3';
import duckUrl from './sounds/duck.mp3';

function Game() {
  let [ducks, setDucks] = useState([]);
  let [blueDucks, setBlueDucks] = useState([]);
  let [blockers, setBlockers] = useState([]);
  let [playerPoints, setPlayerPoints] = useState(0);
  let [blueDuckFlag, setBlueDuckFlag] = useState(false);
  let [playerName, setPlayerName] = useState("");
  let [nextLevel, setNextLevel] = useState("level1");
  let [gameLevel, setGameLevel] = useState({level1: false, level2: false, level3: false, gameEnd: false});
  let [apiData, setApiData] = useState();
  let [best5, setBest5] = useState();
  let [other5, setOther5] = useState();
  let [getBest5, setGetBest5] = useState(false);
  let [best5Ready, setBest5Ready] = useState(false);
  let [texts, setTexts] = useState({
                                      "intro" : "¿Cuál es tu nombre vaquero?",
                                      "level1" : {
                                          "text1" : "Veamos qué tal lo haces forastero."
                                      },
                                      "level2" : {
                                          "text1" : "No está mal. ¿Te atreves con el siguiente nivel?",
                                          "text2" : "¡Oh, vaya! Quizás tendría que haberte avisado, los azules restan."
                                      },
                                      "level3" : {
                                          "text1" : "¿Preparado para el gran final?"
                                      },
                                      "gameEnd" : {
                                          "text1" : "Muy bien vaquero. ¿Otro intento?",
                                          // "text1" : "Muy bien vaquero. ¿Habrás sido el más rápido?",
                                          "text2" : "Hmm... parece que no, pero no te preocupes, también tenemos un lugar para los de tu calaña.",
                                          "text3" : "Enhorabuena vaquero, aquí sí tienes un hueco acorde a tus habilidades.",
                                          "text4" : "Pues va a ser que no, aunque siempre puedes volver a intentarlo."
                                      }
});
  // let [getTexts, setGetTexts] = useState(false);
  let [textsReady, setTextsReady] = useState(true);
  let [duckDead, setDuckDead] = useState([]);

  const generateDucks = (level, direction, vel, points) => {
    let newDucks = ducks.slice();
    newDucks.push({level: level, direction: direction, vel: vel, points: points});
    setDucks(newDucks);
  }

  const generateBlueDucks = (level, direction, vel, points) => {
    let newDucks = ducks.slice();
    newDucks.push({level: level, direction: direction, vel: vel, points: points});
    setBlueDucks(newDucks);
  }

  // const getApiData = (url) => {
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(data => setApiData(data))
  // }

  useEffect(() => {
    let currentLevel = {level1: false, level2: false, level3: false, gameEnd: false};
    currentLevel[nextLevel] = true;
    setGameLevel(currentLevel);
  }, [nextLevel])

  // useEffect(() => {
  //   setGetTexts(true);
  //   let collection = "GameTexts";
  //   getApiData("http://localhost:9000/apiData/" + collection);
  // }, [])

  // useEffect(() => {
  //   if (gameLevel.gameEnd) {
  //     setGetBest5(true);
  //     let collection = "Best5";
  //     getApiData("http://localhost:9000/apiData/" + collection);
  //   }
  // }, [gameLevel])

  // useEffect(() => {
  //   if (apiData && getTexts) {
  //     setGetTexts(false);
  //     setTexts(apiData.slice()[0].texts);
  //   } else if (apiData && getBest5) {
  //     setGetBest5(false);
  //     setBest5(apiData[0].trollRecords.array.slice());
  //     setOther5(apiData[0].playerRecords.array.slice());
  //   }
  // }, [apiData])

  // useEffect(() => {
  //   setTextsReady(true);
  // }, [texts])

  // useEffect(() => {
  //   setBest5Ready(true);
  // }, [best5])

  useEffect(() => {
    if (gameLevel.level1 || gameLevel.level2 || gameLevel.level3) {
      let duckAudio = new Audio(duckUrl);
      duckAudio.play();
    }
  }, [duckDead])

  const shot = () => {
    let shotAudio = new Audio(shotUrl);
    shotAudio.play();
  }

  const reloadGame = () => {
    window.location.href = "http://localhost:3000/";
  }
  
  funcs.useEventListener("mousedown", shot);

  return (
    <BrowserRouter>
      <Target />
      <Footer />
      <div className="background"></div>
      {textsReady && <Route path='/game'>
        <div className="game-container">
          <div className="title">
            <p className="title-p title-first">React</p>
            <img src={titleImg} alt="duck" />
            <p className="title-p title-second">Duck</p>
          </div>
          {blockers.map((blocker, key) => {return <Blocker key={key} blocker={blocker} />})}
          <div className="base base-top"></div>
          <div className="grass"></div>
          <div className="base base-mid"></div>
          <div className="top-wave"></div>
          <div className="base base-bottom"></div>
          <div className="bottom-wave"></div>
          {ducks.map((duck, key) => {
                                      let id = "duck-" + key;
                                      return <Duck key={key} id={id} duck={duck} playerPoints={playerPoints} 
                                      setPlayerPoints={setPlayerPoints} setBlueDuckFlag={setBlueDuckFlag} duckDead={duckDead} setDuckDead={setDuckDead} />
                                    })}
          {blueDucks.map((duck, key) => {
                                      let id = "blueDuck-" + key;
                                      return <Duck key={key} id={id} duck={duck} playerPoints={playerPoints} 
                                      setPlayerPoints={setPlayerPoints} setBlueDuckFlag={setBlueDuckFlag} duckDead={duckDead} setDuckDead={setDuckDead} />
                                    })}
        </div>
        {gameLevel.level1 && <GameLevel1 gameLevel={gameLevel} setNextLevel={setNextLevel} 
                                         texts={texts.level1} generateDucks={generateDucks} />}
        {gameLevel.level2 && <GameLevel2 gameLevel={gameLevel} setNextLevel={setNextLevel} blueDuckFlag={blueDuckFlag} texts={texts.level2} setDucks={setDucks}  
                                         setBlueDucks={setBlueDucks} generateDucks={generateDucks} generateBlueDucks={generateBlueDucks} setBlockers={setBlockers} />}
        {gameLevel.level3 && <GameLevel3 gameLevel={gameLevel} setNextLevel={setNextLevel} blueDuckFlag={blueDuckFlag} texts={texts.level3} setDucks={setDucks}
                                         setBlueDucks={setBlueDucks} generateDucks={generateDucks} generateBlueDucks={generateBlueDucks} setBlockers={setBlockers} />}
        {gameLevel.gameEnd && <TextPanel text={texts.gameEnd.text1} buttonText="volver a jugar" buttonAction={reloadGame} linkText="" link="" />}
        <Player player={playerName} points={playerPoints} />
      </Route>}
      {textsReady && <Route exact path='/'>
        {<GameIntro introText={texts.intro} playerName={playerName} setPlayerName={setPlayerName} />}
      </Route>}
      <Route path='/end'>
        {best5Ready && <GameEnd best5={best5} other5={other5} texts={texts.gameEnd} playerName={playerName} playerPoints={playerPoints} />}
      </Route>
    </BrowserRouter>
  );
}

export default Game;