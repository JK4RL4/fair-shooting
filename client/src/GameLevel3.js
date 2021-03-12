import {useState, useEffect} from 'react';
import TextPanel from './TextPanel';
import funcs from './functions';

function GameLevel3(props) {
  let [startText, setStartText] = useState(true);
  let [timer, setTimer] = useState(200);
  let gameTimer, gameDucks, gameBlueDucks;

  let startLevel3 = () => {
    setStartText(false);
  }

  useEffect(() => {
    props.setDucks([]);
    props.setBlueDucks([]);
  }, [])

  useEffect(() => {
    if (!startText) {
      let i = 0;

      document.querySelectorAll(".block-big").forEach(block => {
        if (i % 2) {
          block.classList.add("block-big-animation");
        } else {
          block.classList.add("block-big-animation-reverse");
        }
        i++;
      })
  
      document.querySelectorAll(".block-little-left").forEach(block => {
        block.classList.add("block-little-left-animation");
      })
  
      document.querySelectorAll(".block-little-right").forEach(block => {
        block.classList.add("block-little-right-animation");
      })
    }
  }, [startText])

  useEffect(() => {
    if (!startText && props.gameLevel.level3) {
      gameTimer = setTimeout(() => setTimer(timer - 1), 50);

      gameDucks = setTimeout(() => {
        if (timer > 0) {
            props.generateDucks(funcs.randomizeLevel(), funcs.randomizeDirection(), funcs.randomizeVel(6, 4), 100);
        } 
      }, 1000)

      gameBlueDucks = setTimeout(() => {
        if (timer > 0 && timer % 2) {
            props.generateBlueDucks(funcs.randomizeLevel(), funcs.randomizeDirection(), funcs.randomizeVel(8, 5), 50);
        }
      }, 1000)

      if (timer < 0) {
        let ducks = document.querySelectorAll(".hit-box");
        if (ducks.length === 0) {
          clearTimeout(gameTimer);
          clearTimeout(gameDucks);
          clearTimeout(gameBlueDucks);
          props.setNextLevel("gameEnd");
        }
      }
    }
  }, [startText, timer])

  return (
    <>
    {startText && <TextPanel text={props.texts.text1} buttonText="empezar" buttonAction={startLevel3} linkText="" link="" />}
    </>
  );
}
    
export default GameLevel3;