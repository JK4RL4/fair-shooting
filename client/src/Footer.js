import bbkLogo from './img/bbk_logo.png';

function Footer() {

    return (
        <div className="footer">
            <p>Realizado por J. K. Somoza</p>
            <div className="footer-logo">
                <img src={bbkLogo} alt="Logo BBK" />
            </div>
        </div>
    );
}
  
export default Footer;
