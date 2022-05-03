
import './NavBar.css';
import { useNavigate } from "react-router-dom";



function NavBar(props) {
    const {logOpen, setLogOpen, width} = props;
    let navigate = useNavigate();

    const handleOpenLog = function(e) {
        setLogOpen(e.target.checked)
    }

    const handleLogoClick = function(e) {
        navigate("/")
    }

    return(
        <div className="navbar" style={{width: width}}>
            <div style={{width: "50%", height: "100%", display: "flex", alignItems: "center"}}>
                <img src="/logo.png" alt="a book" className="logo" onClick={handleLogoClick}></img>
            </div>
            <div style={{width: "50%", height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                <label className="switch ">
                    <input type="checkbox" checked={logOpen} onChange={handleOpenLog}/>
                    <span className="slider round"></span>
                </label>
            </div>
            
            
        </div>
    )
}

export default NavBar;