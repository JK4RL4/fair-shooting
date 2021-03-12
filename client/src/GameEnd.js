import {useState, useEffect} from 'react';
import TextPanel from './TextPanel';
import Best5 from './Best5';

function GameEnd(props) {
  let [best5, setBest5] = useState(true);
  let [showList, setShowList] = useState(props.best5.slice());
  let [startText, setStartText] = useState(true);
  let [endText, setEndText] = useState(false);
  let [newRecord, setNewRecord] = useState(false);
  let [playerRecordRow, setPlayerRecordRow] = useState(["black", "black", "black", "black", "black"]);

  const checkPlayerPoints = () => {
    let other5 = props.other5.slice();
    let newPlayerRecord = other5.find(player => player.points < props.playerPoints);
    if (newPlayerRecord) {
      let firstPart = other5.slice(0, other5.indexOf(newPlayerRecord));
      let secondPart = other5.slice(other5.indexOf(newPlayerRecord));
      let newRecords = firstPart.concat([{name: props.playerName, points: props.playerPoints}]).concat(secondPart);
      let highlightRow = playerRecordRow.slice();
      newRecords.pop();
      saveRecords({records: newRecords});
      setNewRecord(true);
      setShowList(newRecords);
      highlightRow[other5.indexOf(newPlayerRecord)] = "red";
      setPlayerRecordRow(highlightRow);
    } else {
      setShowList(other5);
    }
    setStartText(false);
    setEndText(true);
    setBest5(false);
  }

  const saveRecords = (records) => {
    let fetchData = {
      method: "PUT",
      body: JSON.stringify(records),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    }
  
    fetch("http://localhost:9000/apiData/Best5", fetchData)
    .then(res => res.json())
    .then(data => console.log(data))
  }

  const reloadGame = () => {
    window.location.href = "http://localhost:3000/";
  }

  useEffect(() => {
    setTimeout(() => {
      checkPlayerPoints();
    }, 5000);
  }, [])

  return (
    <>
    {startText && <TextPanel text={props.texts.text2} buttonText="" buttonAction={null} linkText="" link="" />}
    {endText && newRecord && <TextPanel text={props.texts.text3} buttonText="volver a jugar" buttonAction={reloadGame} linkText="" link="" />}
    {endText && !newRecord && <TextPanel text={props.texts.text4} buttonText="volver a jugar" buttonAction={reloadGame} linkText="" link="" />}
    {best5 && <Best5 showList={showList} best5={best5} playerRecordRow={playerRecordRow} />}
    {!best5 && <Best5 showList={showList} best5={best5} playerRecordRow={playerRecordRow} />}
    </>
  );
}
    
export default GameEnd;