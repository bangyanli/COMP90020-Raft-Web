const hosts = JSON.parse(process.env.REACT_APP_HOSTS);


async function myFetch(url, init) {
    // fetch until one of the host respond

    for(let i = 0; i < hosts.length; i++) {
        try{
            // Fetch using the first host
            const response =  await fetch(hosts[0] + url, init);
            // console.log(response);

            
            if(response.ok) {
                // If success, just return
                const res = await response.json();
                return res.data;

            }else if(response.status === 303){ 
                // If server respond with a host leader
                // Use new leader, set the leader as the first in hosts
                const res = await response.json();
                const leader = "http://" + res.msg;
                const index = hosts.indexOf(leader);
                hosts.splice(index, 1);
                hosts.unshift(leader);
            } else if(response.status == 400) {
                const res = await response.json();
                alert(res.msg);
                break;
            }

        }catch (err){
            console.log(err);
            // if failed, shift the first host to last, continue interation
            hosts.push(hosts.shift());
        }
        
        
    }
    
    
}

export {
    myFetch
}