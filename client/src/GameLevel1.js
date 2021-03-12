import {useState, useEffect} from 'react';
import TextPanel from './TextPanel';
import funcs from './functions';

function GameLevel1(props) {
  let [startText, setStartText] = useState(true);
  let [timer, setTimer] = useState(200);
  let gameTimer, gameDucks;

  let startLevel1 = () => {
    setStartText(false);
  }

  useEffect(() => {
    if (!startText && props.gameLevel.level1) {
      gameTimer = setTimeout(() => setTimer(timer - 1), 50);
      gameDucks = setTimeout(() => {
        if (timer > 0) {
          props.generateDucks(funcs.randomizeLevel(), funcs.randomizeDirection(), funcs.randomizeVel(6, 4), 100);
        } else  if (timer < 0) {
          let ducks = document.querySelectorAll(".hit-box");
          if (ducks.length === 0) {
            clearTimeout(gameTimer);
            clearTimeout(gameDucks);
            props.setNextLevel("level2");
          }
        }
      }, 1000)
    }
  }, [startText, timer])

  return (
    <>
    {startText && <TextPanel text={props.texts.text1} buttonText="empezar" buttonAction={startLevel1} linkText="" link="" />}
    </>
  );
}
    
export default GameLevel1;