import {useState, useEffect} from 'react';
import funcs from './functions';

function Blocker(props) {
  let [level, setLevel] = useState(props.blocker.level);
  let [position, setPosition] = useState(props.blocker.position);
  let [type, setType] = useState(props.blocker.type);
   
  const blockClasses = () => {
    let blockImg, blockLevel, blockPosition;
    
    switch (type) {
        case "little":
                blockImg = "block-little";
                break;
        case "big":
                blockImg = "block-big";
                break;
        default:
                break;
    }

    switch (level) {
        case "top":
                blockLevel = "block-top";
                break;
        case "mid":
                blockLevel = "block-mid";
                break;
        case "bottom":
                blockLevel = "block-bottom";
                break;
        default:
            break;
    }

    switch (position) {
        case "left":
            blockPosition = "block-" + type + "-left";
            break;
        case "center":
            blockPosition = "block-" + type + "-center";
            break;
        case "right":
            blockPosition = "block-" + type + "-right";
            break;
        default:
            break;
      }
    return "block " + blockImg + " " + blockLevel + " " + blockPosition;
  }

  

  return (
    <div className={blockClasses()}></div>
  );
}
  
export default Blocker;