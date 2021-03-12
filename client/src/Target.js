import {useState} from 'react';
import funcs from './functions';

function Target() {
  let [sight, setSight] = useState({top: "50%", left: "50%"});
  let sightWidth = 32;
  let sightHeight = 32;

  const getMouseMove = (e) => {
    let moveX = e.clientX;
    let moveY = e.clientY;

    setSight({top: (moveY - sightWidth/2), left: (moveX - sightHeight/2)});
  }

  funcs.useEventListener("mousemove", getMouseMove);

  return (
    <div className="target" style={sight}></div>
  );
}
  
export default Target;