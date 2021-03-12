import {useState, useEffect} from 'react';
import TextPanel from './TextPanel';
import funcs from './functions';

function GameLevel2(props) {
  let [startText, setStartText] = useState(true);
  let [timer, setTimer] = useState(200);
  let [blueAdvise, setBlueAdvise] = useState(false);
  let gameTimer, gameDucks, gameBlueDucks;

  let startLevel2 = () => {
    setStartText(false);
  }

  useEffect(() => {
    let blockers = [{level: "top", type: "big", position: "center"},
                       {level: "mid", type: "little", position: "left"},
                       {level: "mid", type: "little", position: "center"},
                       {level: "mid", type: "little", position: "right"},
                       {level: "bottom", type: "big", position: "center"}];
    setTimeout(() => props.setBlockers(blockers), 50);
    props.setDucks([]);
    props.setBlueDucks([]);
  }, [])

  useEffect(() => {
    if (props.blueDuckFlag) {
      setBlueAdvise(true);
    }
  }, [props.blueDuckFlag])

  useEffect(() => {
    if (blueAdvise) {
      setTimeout(() => setBlueAdvise(false), 5000);
    }
  }, [blueAdvise])

  useEffect(() => {
    if (!startText && props.gameLevel.level2) {
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
          props.setNextLevel("level3");
        }
      }
    }
  }, [startText, timer])

  return (
    <>
    {startText && <TextPanel text={props.texts.text1} buttonText="empezar" buttonAction={startLevel2} linkText="" link="" />}
    {blueAdvise && <TextPanel text={props.texts.text2} buttonText="" buttonAction={null} linkText="" link="" />}
    </>
  );
}
    
export default GameLevel2;


