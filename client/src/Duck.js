import {useState, useEffect} from 'react';
import funcs from './functions';

function Duck(props) {
  let [level, setLevel] = useState(props.duck.level);
  let [moveAnimation, setMoveAnimation] = useState({active: false, animation: {}});
  let [direction, setDirection] = useState(props.duck.direction);
  let [vel, setVel] = useState(props.duck.vel);
  let [points, setPoints] = useState(props.duck.points);
  let [pointsColor, setPointsColor] = useState({color: "green"});
  let [mounted, setMounted] = useState(true);
  let [showExplosion, setShowExplosion] = useState(false);
  let [showHitBox, setShowHitBox] = useState(true);
  let [showDuck, setShowDuck] = useState(true);
  let [showDuckPoints, setShowDuckPoints] = useState(false);
  let [duckPenalty, setDuckPenalty] = useState();
  let [explosionPosition, setExplosionPosition] = useState({backgroundPosition: "-8% -10%"});
  let [explosionAnimation, setExplosionAnimation] = useState();

  const shot = (e) => {
    if (showHitBox && e.target.id === "hit-box-" + props.id) {
          setTimeout(() => setExplosionPosition({backgroundPosition: "42% -10%"}), 50);
          setTimeout(() => setExplosionPosition({backgroundPosition: "94% -8%"}), 100);
          setTimeout(() => setExplosionPosition({backgroundPosition: "-6% 45%"}), 150);
          setTimeout(() => setExplosionPosition({backgroundPosition: "44% 41%"}), 200);
          setTimeout(() => setExplosionPosition({backgroundPosition: "98% 44%"}), 250);
          setTimeout(() => setExplosionPosition({backgroundPosition: "-4% 104%"}), 300);
          setTimeout(() => setExplosionPosition({backgroundPosition: "46% 104%"}), 350);
          setTimeout(() => setExplosionPosition({backgroundPosition: "98% 104%"}), 400);
          props.setDuckDead(!props.duckDead);
          setShowExplosion(true);
          setShowHitBox(false);
          setShowDuckPoints(true);
          if (points === 100) {
            props.setPlayerPoints(props.playerPoints + points);
          } else {
            props.setBlueDuckFlag(true);
            props.setPlayerPoints(props.playerPoints - points);
          }
          setExplosionAnimation({animationName: "duckHit"});
          setTimeout(() => setShowExplosion(false), 450);
          setTimeout(() => setShowDuck(false), 450);
          setTimeout(() => setMounted(false), 1000);
    }
  }

  const moveDuck = () => {
    switch (direction) {
      case "left":
        setMoveAnimation({active: true, animation: {animationName: "duckLeft", animationDuration: vel + "s"}});
        break;
      case "right":
        setMoveAnimation({active: true, animation: {animationName: "duckRight", animationDuration: vel + "s"}});
        break;
      default:
        break;
    }
  }

  const duckClasses = () => {
    let duckImg;
    
    switch (direction) {
      case "left":
        if (points === 100) {
          duckImg = "duck-left";
        } else {
          duckImg = "duck-left-blue";
        }
        break;
      case "right":
        if(points === 100) {
          duckImg = "duck-right";
        } else {
          duckImg = "duck-right-blue";
        }
        break;
      default:
        break;
    }

    return "duck " + duckImg;
  }

  const duckContainerClasses = () => {
    let duckLevel;
    
    switch (level) {
      case "top":
        duckLevel = "duck-top";
        break;
      case "mid":
        duckLevel = "duck-mid";
        break;
      case "bottom":
        duckLevel = "duck-bottom";
        break;
    }

    return "duck-container " + duckLevel;
  }

  useEffect(() => {
    moveDuck();
  }, [])

  useEffect(() => {
    if (moveAnimation.active) {
      setTimeout(() => setMounted(false), (1000 * vel + 1000));
    }
  }, [moveAnimation])

  useEffect(() => {
    if (points === 100) {
      setDuckPenalty("+");
      setPointsColor({color: "green"});
    } else {
      setDuckPenalty("-");
      setPointsColor({color: "red"});
    }
  }, [])

  funcs.useEventListener("mousedown", shot);

  return (
    <>
    {mounted && <div id={props.id} className={duckContainerClasses()} style={moveAnimation.animation}>
      {showDuck && <div className={duckClasses()} style={explosionAnimation}>
        {showHitBox && <div id={"hit-box-" + props.id} className="hit-box"></div>}
      </div>}
      {showExplosion && <div className="duck-explosion" style={explosionPosition}></div>}
      {showDuckPoints && <div className="duck-points" style={pointsColor}>
        <p>{duckPenalty}{points}</p>
      </div>}
    </div>}
    </>
  );
}
  
export default Duck;