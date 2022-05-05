import { useEffect, useState } from 'react';
import { election, setLatency  as setNodeLatency, shutdown,  } from '../../api/raft';


import './ServerLogs.css'


function ServerLogs() {
    // Connect to the server using websockt
    // expect the socket to return data similar to mockData

    const servers = JSON.parse(process.env.REACT_APP_HOSTS);
    const time = `[${(new Date().toLocaleString())}]\n`

    return(
    <div className="logs-container" >
        {
            servers.map((server) => 
            <Log serverUrl={server} servers={servers}/>
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
    const {serverUrl, isLeader = true, servers} = props
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState(0);

    const [ip, setIp] = useState();
    const [latency, setLatency] = useState();

    const handleChangeIp = (e) => {
        // console.log(e.target.value);
        setIp(e.target.value);
    }

    const handleChangeLatency = (e) => {
        // console.log(e.target.value);
        setLatency(e.target.value);
    }

    const handleAddLatency = () => {
        console.log("Adding latency...")
        console.log(ip);
        console.log(latency);
        setNodeLatency(ip, serverUrl, latency);
    }

    const handleElection = () => {
        console.log("Start election");
        election(serverUrl);
    }

    const handleShutdown = () => {
        console.log("shutting down");
        shutdown(serverUrl)
    }


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
            var index = event.data.lastIndexOf("become")
            if(index>15){
                var leaderHost = event.data.subString(index-15,index-1)
                setData(old => [...old,leaderHost])
                
            }
            setData(old => [...old, event.data])
        });
        
        //connection closed
        socket.addEventListener('close',function (event) {

        })
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
            <div className="operations">
                <select name="ip" id="ip" value={ip} onChange={handleChangeIp}>
                    <option value="">Select a node...</option>
                    {servers.filter(elem => elem!==serverUrl).map((elem) => {
                        return <option value={elem}>{elem}</option>
                    })}
                </select>
                <input placeholder="latency" style={{width: "90px"}} onChange={handleChangeLatency}></input>
                <button onClick={handleAddLatency}>add latency</button>
                <span style={{flexGrow: 1}}></span>
                <button onClick={handleElection}>election</button>
                <button onClick={handleShutdown}>safe shutdown</button>
                
            </div>
        </div>

        
    )
}

export default ServerLogs;