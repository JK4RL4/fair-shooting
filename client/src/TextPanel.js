import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cowboyImg from './img/cowboy.png';

function TextPanel(props) {
    let [button, setButton] = useState(true);
    let [link, setLink] = useState(true);

    useEffect(() => {
        if (props.buttonText === "") {
            setButton(false);
        }

        if (props.linkText === "") {
            setLink(false);
        }
    }, [])

    return (
        <div className="text-panel">
            <img src={cowboyImg} alt="cowboy" />
            <div className="text-panel-info">
                <p>{props.text}</p>
                {button && <button onClick={props.buttonAction}>{props.buttonText}</button>}
                {link && <Link to={props.link} className="text-panel-link">{props.linkText}</Link>}
            </div>
        </div>
    );
  }
    
  export default TextPanel;