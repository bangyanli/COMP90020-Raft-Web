
import './NavBar.css';



function NavBar(props) {
    const {logOpen, setLogOpen} = props;

    const handleOpenLog = function(e) {
        setLogOpen(e.target.checked)
    }

    return(
        <div className="navbar">
            <label className="switch ">
                <input type="checkbox" checked={logOpen} onChange={handleOpenLog}/>
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default NavBar;