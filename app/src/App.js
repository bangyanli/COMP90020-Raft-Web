import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  // Switch
} from "react-router-dom";

import NavBar from './components/NavBar/NavBar';
import ServerLogs from './components/ServerLogs/ServerLogs';
import Homepage from './pages/Homepage/Homepage';
import BookDetail from './pages/BookDetail/BookDetail';
import { useEffect, useState } from 'react';
import Chapter from './components/Chapter/Chapter';

function App() {
  const logWidth = "30vw";
  const hosts = JSON.parse(process.env.REACT_APP_HOSTS);
  const preHost = localStorage.getItem("currentHost");
  const [currentHost, setCurrentHost] = useState(preHost ? preHost : hosts[0]);

  const handleChangeHost = (newHost) => {
    setCurrentHost(newHost);
    localStorage.setItem("currentHost", newHost)
  }

  const [logOpen, setLogOpen] = useState(false);
  const [bodyWidth, setBodyWidth] = useState("100vw");
  useEffect(()=>{
    setBodyWidth(`calc(100vw - ${logOpen ? logWidth : "0vw"})`)
    // console.log(bodyWidth);
  },[logOpen])


  return (
    <div style={{height: "100vh", display: "flex", flexDirection: "row"}}>
      <div style={{width: bodyWidth, transition: "0.4s", display: "flex", flexDirection:"column", zIndex: 2}}>
        <BrowserRouter>
          <NavBar logOpen={logOpen} setLogOpen={setLogOpen} width={bodyWidth} currentHost={currentHost} hosts={hosts} handleChangeHost={handleChangeHost}/>
          <div className="body-container">
            
            <Routes>
              <Route path="/" element={<Homepage currentHost={currentHost} />} />
              <Route path="/book/:bookName" element={<BookDetail currentHost={currentHost} />}/>
              <Route path="/book/:bookName/:chapterName" element={<Chapter currentHost={currentHost} />}/>
              
            </Routes> 
            
          </div>
        </BrowserRouter>

      </div>
      <ServerLogs/>
    </div>
  );
}

export default App;
