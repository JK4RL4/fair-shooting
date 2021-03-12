import {useState} from 'react';
import {Link} from 'react-router-dom';
import titleImg from './img/duck_left.png';
import cowboyImg from './img/cowboy.png';

function GameIntro(props) {
  let [loaded, setLoaded] = useState(false);

  return (
    <>
    {!loaded && <div className="loading-panel">
        <div className="background">
          <div className="loading">
            <p>Cargando...</p>
          </div>
        </div>
    </div>}
    <div className="background">
      <div className="title">
        <p className="title-p title-first">React</p>
        <img src={titleImg} alt="duck" />
        <p className="title-p title-second">Duck</p>
      </div>
      <div className="intro">
        <img src={cowboyImg} onLoad={() => setLoaded(true)} alt="cowboy" />
        {loaded && <label htmlFor="player-name">{props.introText}</label>}
        {loaded && <input type="text" maxLength="8" className="player-name" id="player-name" name="player-name" 
               onChange={e => props.setPlayerName(e.target.value)} value={props.playerName} />}
        {loaded && <Link to="/game" style={{color: "red"}}>JUGAR</Link>}
      </div>
    </div>
    </>
  );
}
    
export default GameIntro;