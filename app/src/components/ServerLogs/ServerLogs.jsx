import { useEffect, useState } from 'react';
import { election, setLatency  as setNodeLatency, shutdown,  } from '../../api/raft';


import './ServerLogs.css'


function ServerLogs() {
    // Connect to the server using websockt
    // expect the socket to return data similar to mockData

    const servers = JSON.parse(process.env.REACT_APP_HOSTS);

    return(
    <div className="logs-container" >
        {
            servers.map((server) => 
            <Log key={server} serverUrl={server} servers={servers}/>
            )
        }
    </div>)
}

function Log(props) {
    const {serverUrl, servers} = props
    const [data, setData] = useState([]);
    const [leader,setLeader] = useState(false);

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

    const connect = () => {
        const url = `${serverUrl.replace("http", "ws")}/raft`;
        let socket = new WebSocket(url);
    
        // Connection opened
        socket.addEventListener('open', function (event) {
            // console.log("connected!");
            setData([]);
        });

        // Listen for messages
        socket.addEventListener('message', function (event) {
            // console.log('Message from server ', event.data);
            let data = String(event.data);
            let index = data.lastIndexOf("become LEADER");
            if(data.includes("FOLLOWER")){
                setLeader(false);
            }
            if(index>15){
                let leaderHost = data.substring(index-15,index-2);
                let updateUrl = String(serverUrl.replace("http://",""));
                updateUrl = updateUrl.substring(0,updateUrl.length-1);
                //console.log(leaderHost)
                //console.log(updateUrl)
                if(leaderHost===updateUrl){
                    setLeader(true);
                }
                ////console.log("leader index : " + index)
                
            }
            setData(old => [...old, data]);
        });
        
        //connection closed
        socket.addEventListener('close',function (event) {
            setData(["connection closed, retry it in 2seconds"]);
            setLeader(false);
            setTimeout(function() {
                connect();
              }, 1000);
        });

        socket.addEventListener('error',function(event){
            setData(["connection error, retry it in 2seconds"]);
            setLeader(false)
            socket.close();
        });
    }
    useEffect(()=>{
        
        connect();

        // eslint-disable-next-line
    }, [])

    
    return (

        <div className="log-container">
            <div>
                {
                    leader ? <span>Leader: </span> : <span/>
                } {serverUrl}
            </div>
            <div className="log">
                {data.map((ele) => 
                    <div><pre className="log-format">{ele}</pre></div>
                )}
            </div>
            <div className="operations">
                <select name="ip" id="ip" value={ip} onChange={handleChangeIp}>
                    <option key="" value="">Select a node...</option>
                    {servers.filter(elem => elem!==serverUrl).map((elem) => {
                        return <option key={elem} value={elem}>{elem}</option>
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