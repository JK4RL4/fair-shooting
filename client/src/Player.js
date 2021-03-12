function Player(props) {

    return (
      <>
        <div className="interface">
          <p className="player">{props.player}</p>
          <p className="points">{props.points}</p>
        </div>
      </>
    );
  }
  
  export default Player;