function Best5 (props) {
 
    return (
        <>
        <div className="best5">
            <div className="best5-content">
            {props.best5 && <p className="best5-title">The Best 5</p>}
            {!props.best5 && <p className="best5-title">The Other 5</p>}
            <table>
                <thead>
                <tr className="best5-row-headers">
                <th className="best5-pos">Pos.</th>
                <th className="best5-player">Jugador</th>
                <th className="best5-points">Puntos</th>
                </tr>
                </thead>
                <tbody>
                <tr className="best5-row-player" style={{color: props.playerRecordRow[0]}}>
                    <td className="best5-position">1</td>
                    <td className="best5-player-name">{props.showList[0].name}</td>
                    <td className="best5-player-points">{props.showList[0].points}</td>
                </tr>
                <tr className="best5-row-player" style={{color: props.playerRecordRow[1]}}>
                    <td className="best5-position">2</td>
                    <td className="best5-player-name">{props.showList[1].name}</td>
                    <td className="best5-player-points">{props.showList[1].points}</td>
                </tr>
                <tr className="best5-row-player" style={{color: props.playerRecordRow[2]}}>
                    <td className="best5-position">3</td>
                    <td className="best5-player-name">{props.showList[2].name}</td>
                    <td className="best5-player-points">{props.showList[2].points}</td>
                </tr>
                <tr className="best5-row-player" style={{color: props.playerRecordRow[3]}}>
                    <td className="best5-position">4</td>
                    <td className="best5-player-name">{props.showList[3].name}</td>
                    <td className="best5-player-points">{props.showList[3].points}</td>
                </tr>
                <tr className="best5-row-player" style={{color: props.playerRecordRow[4]}}>
                    <td className="best5-position">5</td>
                    <td className="best5-player-name">{props.showList[4].name}</td>
                    <td className="best5-player-points">{props.showList[4].points}</td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
        </>
    );
  }
      
  export default Best5;


