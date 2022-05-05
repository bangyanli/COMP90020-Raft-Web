import { useEffect, useState } from 'react';

import './ServerLogs.css'


const mockData = [
    "added some chapter to some book",
    "added some chapter to some book",
    "some book is created",
    "added some chapter to some book",
    "added some chapter to some book",
    "updated some chapter to anthoer chapter with a very very very very long name",
    "updated some chapter to anthoer chapter",
    "delted some chapter",
    "delted some book",
    "added some chapter to some book",
    "added some chapter to some book",
    "some book is created",
    "added some chapter to some book",
    "added some chapter to some book",
    "updated some chapter to anthoer chapter",
    "updated some chapter to anthoer chapter",
    "delted some chapter",
    "delted some book",
]

function ServerLogs() {
    // Connect to the server using websockt
    // expect the socket to return data similar to mockData

    const servers = JSON.parse(process.env.REACT_APP_HOSTS);
    const time = `[${(new Date().toLocaleString())}]\n`

    return(
    <div className="logs-container" >
        {
            servers.map((server) => 
            <Log serverUrl={server}/>
            // <div>
            //     <div style={{margin: "30px 30px 0px 30px"}}>
            //         {}{server}
            //     </div>
            //     <div className="log">
            //         {mockData.map((ele) => 
            //             <div><pre className="log-format">{time+ele}</pre></div>
            //         )}
            //     </div>
            //     <Log serverUrl={server}/>
            // </div>
            )
        }
    </div>)
}

function Log(props) {
    const {serverUrl, isLeader = true} = props
    const [data, setData] = useState([]);

    useEffect(()=>{
        const url = `${serverUrl.replace("http", "ws")}/raft`
        const socket = new WebSocket(url);
    
        // Connection opened
        socket.addEventListener('open', function (event) {
            // console.log("connected!");
        });
    
        // Listen for messages
        socket.addEventListener('message', function (event) {
            // console.log('Message from server ', event.data);
            setData(old => [...old, event.data])
        });
    }, [])

    
    return (

        <div className="log-container">
            <div>
                {
                    isLeader ? <span>Leader: </span> : <span/>
                } {serverUrl}
            </div>
            <div className="log">
                {data.map((ele) => 
                    <div><pre className="log-format">{ele}</pre></div>
                )}
            </div>
        </div>

        
    )
}

export default ServerLogs;